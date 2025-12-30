import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Plus, FolderOpen, ChevronRight, Eye, BookOpen, RefreshCw } from 'lucide-react';
import { createCategory, getAllCategories, getCategoryDetails } from '../../services/operations/categoryapi';

export default function AdminCategoryManager() {
  const { token } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const result = await getAllCategories(token);
    if (result) {
      setCategories(result);
    }
  };

  const handleCreateCategory = async () => {
    if (!formData.name.trim()) {
      return;
    }

    setLoading(true);
    const result = await createCategory(token, formData);
    
    if (result) {
      setFormData({ name: '', description: '' });
      setShowCreateModal(false);
      fetchCategories();
    }
    setLoading(false);
  };

  const handleViewCategory = async (id) => {
    const result = await getCategoryDetails(token, id);
    if (result) {
      setSelectedCategory(result.data.selectedCategory);
      console.log(selectedCategory)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateCategory();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Category Management</h1>
            <p className="text-gray-600">Create and manage course categories</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchCategories}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg transition-all border border-gray-300 shadow-sm"
              title="Refresh categories"
            >
              <RefreshCw size={18} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              Create Category
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FolderOpen className="text-blue-600" />
              All Categories ({categories.length})
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {categories.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="mx-auto text-gray-400 mb-3" size={48} />
                  <p className="text-gray-500">No categories yet. Create your first one!</p>
                </div>
              ) : (
                categories.map((category) => (
                  <div
                    key={category._id}
                    className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all cursor-pointer group"
                    onClick={() => handleViewCategory(category._id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold text-lg group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {category.description || 'No description'}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <BookOpen size={14} />
                          <span>{category.courses?.length || 0} courses</span>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="text-blue-600" />
              Category Details
            </h2>
            {selectedCategory ? (
              <div className="space-y-6">
                <div>
                  <label className="text-gray-500 text-sm uppercase tracking-wide">Category Name</label>
                  <p className="text-gray-900 text-2xl font-semibold mt-2">{selectedCategory.name}</p>
                </div>
                
                <div>
                  <label className="text-gray-500 text-sm uppercase tracking-wide">Description</label>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {selectedCategory.description || 'No description provided'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-blue-600" size={20} />
                    <label className="text-gray-500 text-sm uppercase tracking-wide">
                      Courses ({selectedCategory.courses?.length || 0})
                    </label>
                  </div>
                  
                  {selectedCategory.courses && selectedCategory.courses.length > 0 ? (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {selectedCategory.courses.map((course) => (
                        <div key={course._id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
                          <p className="text-gray-900 font-medium">{course.courseName || course.name || course.title}</p>
                          {course.instructor && (
                            <p className="text-gray-600 text-sm mt-1">
                              Instructor: {course.instructor.firstName} {course.instructor.lastName}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
                      <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-500">No courses in this category yet</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="text-gray-500 text-sm uppercase tracking-wide">Category ID</label>
                  <p className="text-gray-600 text-xs mt-2 font-mono break-all">{selectedCategory._id}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Eye size={48} className="mb-4 opacity-50" />
                <p className="text-center">Select a category from the list to view its details</p>
              </div>
            )}
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full border border-gray-200 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Create New Category</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="e.g., Web Development"
                    maxLength={50}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-24 resize-none"
                    placeholder="Brief description of this category..."
                    maxLength={200}
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    {formData.description.length}/200 characters
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({ name: '', description: '' });
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-all border border-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={loading || !formData.name.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}