import React, { useState, useEffect, useContext, useRef } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    Input,
    IconButton,
    Typography,
    Textarea,
    Chip,
    Card,
    CardBody,
    CardFooter
} from "@material-tailwind/react";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline, MdEdit, MdImage } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../../../../StoreContext/StoreContext";

const TestimonialsManagement = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState({
        _id: "",
        name: "",
        place: "",
        description: "",
        image: "",
        isActive: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const { BASE_URL } = useContext(AppContext);
    const fileInputRef = useRef(null);

    // Fetch testimonials on component mount
    useEffect(() => {
        fetchTestimonials();
    }, [BASE_URL, filterStatus]);

    const fetchTestimonials = async () => {
        try {
            let url = `${BASE_URL}/admin/testimonial/get`;
            if (filterStatus !== "all") {
                url += `?status=${filterStatus}`;
            }

            const response = await axios.get(url);
            console.log("Testimonials API Response:", response.data);

            setTestimonials(response.data || []);

        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Error fetching testimonials");
        }
    };

    // Handle image change
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setCurrentTestimonial(prev => ({ 
            ...prev, 
            imageFile: file  // important
        }));

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    }
};

    const handleAddClick = () => {
        setEditMode(false);
        setCurrentTestimonial({
            _id: "",
            name: "",
            place: "",
            description: "",
            image: "",
            isActive: true
        });
        setImagePreview("");
        setOpen(true);
    };

    const handleEditClick = (testimonial) => {
        setEditMode(true);
        setCurrentTestimonial(testimonial);
        setImagePreview(testimonial.image);
        setOpen(true);
    };

    const handleSubmit = async () => {
    const { name, place, description, imageFile } = currentTestimonial;

    if (!name.trim() || !place.trim() || !description.trim()) {
        toast.error("Please fill all required fields");
        return;
    }

    // For ADD → image file is required
    if (!editMode && !imageFile) {
        toast.error("Image is required");
        return;
    }

    setIsSubmitting(true);

    try {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("place", place);
        formData.append("description", description);

        // Add image only if selected
        if (imageFile) {
            formData.append("image", imageFile);
        }

        let response;

        if (editMode) {
            response = await axios.put(
                `${BASE_URL}/admin/testimonial/update/${currentTestimonial._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const updated = response.data.testimonial;
            setTestimonials(prev =>
                prev.map(t => t._id === updated._id ? updated : t)
            );

            toast.success("Testimonial updated successfully!");
        } else {
            response = await axios.post(
                `${BASE_URL}/admin/testimonial/create`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const newTestimonial = response.data.testimonial;
            setTestimonials(prev => [newTestimonial, ...prev]);

            toast.success("Testimonial added successfully!");
        }

        setOpen(false);

    } catch (error) {
        console.error("Submit error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Error saving testimonial");
    } finally {
        setIsSubmitting(false);
    }
};

    const handleDeleteTestimonial = async (id) => {
        if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
        try {
            await axios.delete(`${BASE_URL}/admin/testimonial/delete/${id}`);
            setTestimonials(prev => prev.filter(testimonial => testimonial._id !== id));
            toast.success("Testimonial deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(error.response?.data?.message || "Error deleting testimonial");
        }
    };

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Testimonials Management</Typography>
                <Button
                    onClick={handleAddClick}
                    className="flex items-center gap-1 bg-buttonBg text-white"
                >
                    <IoIosAdd className="text-lg" />
                    <span>Add Testimonial</span>
                </Button>
            </div>

            {/* Filter */}
            <div className="mb-6 w-64">
                <div className="flex items-center gap-4">
                    <Chip
                        variant={filterStatus === "all" ? "filled" : "outlined"}
                        value="All"
                        onClick={() => setFilterStatus("all")}
                        className="cursor-pointer"
                        color={filterStatus === "all" ? "blue" : "gray"}
                    />
                    <Chip
                        variant={filterStatus === "active" ? "filled" : "outlined"}
                        value="Active"
                        onClick={() => setFilterStatus("active")}
                        className="cursor-pointer"
                        color={filterStatus === "active" ? "green" : "gray"}
                    />
                    <Chip
                        variant={filterStatus === "inactive" ? "filled" : "outlined"}
                        value="Inactive"
                        onClick={() => setFilterStatus("inactive")}
                        className="cursor-pointer"
                        color={filterStatus === "inactive" ? "red" : "gray"}
                    />
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial._id} className="overflow-hidden shadow-lg">
                        {/* Image Section */}
                        <div className="relative h-48 bg-gray-100">
                            {testimonial.image ? (
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <MdImage className="text-4xl text-gray-400" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <Chip
                                    value={testimonial.isActive ? "Active" : "Inactive"}
                                    color={testimonial.isActive ? "green" : "red"}
                                    size="sm"
                                />
                            </div>
                        </div>

                        <CardBody>
                            {/* Name and Place */}
                            <div className="mb-3">
                                <Typography variant="h5" className="text-gray-900">
                                    {testimonial.name}
                                </Typography>
                                <Typography variant="small" color="gray" className="font-medium">
                                    {testimonial.place}
                                </Typography>
                            </div>
                            {/* Description */}
                            <Typography variant="small" className="text-gray-600 line-clamp-3">
                                "{testimonial.description}"
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 flex justify-between">
                            
                            <div className="flex gap-2">
                                <IconButton
                                    onClick={() => handleEditClick(testimonial)}
                                    variant="text"
                                    color="blue"
                                >
                                    <MdEdit size={20} />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDeleteTestimonial(testimonial._id)}
                                    variant="text"
                                    color="red"
                                >
                                    <MdDeleteOutline size={20} />
                                </IconButton>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-lg">
                    <MdImage className="text-5xl text-gray-400 mx-auto mb-4" />
                    <Typography variant="h6" color="gray" className="mb-2">
                        No testimonials found
                    </Typography>
                    <Typography variant="small" color="gray">
                        Add your first testimonial by clicking the "Add Testimonial" button
                    </Typography>
                </div>
            )}

            <Dialog
                open={open}
                handler={() => setOpen(false)}
                size="md"
                className="rounded-lg"
            >
                <DialogBody className="p-6 max-h-[80vh] overflow-y-auto">
                    <Typography variant="h5" className="text-center mb-6">
                        {editMode ? "Edit Testimonial" : "Add New Testimonial"}
                    </Typography>
                    <div className="mb-6">
                        <Typography variant="small" className="mb-2 block">
                            Profile Image
                        </Typography>
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mb-4">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <MdImage className="text-3xl text-gray-400" />
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                id="image-upload"
                                className="hidden"
                                ref={fileInputRef} // Add a ref
                                onChange={handleImageChange}
                            />
                            <Button
                                variant="outlined"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => document.getElementById('image-upload').click()}
                            >
                                <MdImage />
                                {imagePreview ? "Change Image" : "Upload Image"}
                            </Button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="mb-5">
                        <Input
                            label="Full Name *"
                            value={currentTestimonial.name}
                            onChange={(e) => setCurrentTestimonial(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                            required
                        />
                    </div>

                    {/* Place */}
                    <div className="mb-5">
                        <Input
                            label="City/Place *"
                            value={currentTestimonial.place}
                            onChange={(e) => setCurrentTestimonial(prev => ({
                                ...prev,
                                place: e.target.value
                            }))}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <Textarea
                            label="Testimonial Description *"
                            value={currentTestimonial.description}
                            onChange={(e) => setCurrentTestimonial(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                            rows={4}
                            required
                        />
                    </div>

                    {/* Status Toggle */}
                    <div className="mb-6 flex items-center justify-between">
                        <Typography variant="small">Status</Typography>
                        <div className="flex items-center gap-3">
                            <Typography variant="small">
                                {currentTestimonial.isActive ? "Active" : "Inactive"}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="sm"
                                color={currentTestimonial.isActive ? "red" : "green"}
                                onClick={() => setCurrentTestimonial(prev => ({
                                    ...prev,
                                    isActive: !prev.isActive
                                }))}
                            >
                                {currentTestimonial.isActive ? "Deactivate" : "Activate"}
                            </Button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 pt-4 border-t">
                        <Button
                            onClick={() => setOpen(false)}
                            className="bg-gray-200 text-gray-800"
                            variant="text"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-buttonBg text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? (editMode ? "Updating..." : "Adding...")
                                : (editMode ? "Update Testimonial" : "Add Testimonial")
                            }
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    );
};

export default TestimonialsManagement;