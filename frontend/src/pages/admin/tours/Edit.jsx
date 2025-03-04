import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminToken, apiUrl, imageUrl} from '../../http';
import Sidebar from '../../../components/Sidebar';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${apiUrl}tours/${id}`);
        if (!response.ok) throw new Error('Failed to fetch tour');
        const data = await response.json();
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('price', data.price);
        setValue('location', data.location);
        setValue('duration', data.duration);
        setValue('tour_type', data.tour_type);
        setValue('status', data.status);
        setImagePreview(data.image);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTour();
  }, [id, setValue]);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('location', data.location);
    formData.append('duration', data.duration);
    formData.append('tour_type', data.tour_type);
    formData.append('status', data.status);
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      const response = await fetch(`${apiUrl}tours/${id}`, {
        method: 'POST', 
        body: formData,
        headers: {
          Authorization: `Bearer ${adminToken()}`,
        }
      });

      if (!response.ok) throw new Error('Failed to update tour');
      navigate('/admin/tours');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64 p-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Edit Tour</h3>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price and Location in one row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  {...register('price', { required: 'Price is required' })}
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  {...register('location', { required: 'Location is required' })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Galle">Galle</option>
                  <option value="Gampaha">Gampaha</option>
                </select>
              </div>
            </div>

            {/* Duration and Type in one row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <select
                  {...register('duration', { required: 'Duration is required' })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1 day">1 day</option>
                  <option value="1-3 days">1-3 days</option>
                  <option value="4-7 days">4-7 days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  {...register('tour_type', { required: 'Type is required' })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Adventure">Adventure</option>
                  <option value="Beach">Beach</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>
            </div>

            <input
                type="file"
                {...register('image')}
                accept="image/*"
                className="mt-1 block w-full"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
               />

              {imagePreview && (
                <img
                  src={imagePreview.startsWith('blob') ? imagePreview : `${imageUrl}${imagePreview}`}
                  alt="Preview"
                  className="mt-2 h-32 w-auto object-cover rounded-lg"
                />
              )}


            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register('status', { required: 'Status is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => navigate('/admin/tours')} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Update Tour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
