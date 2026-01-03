import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Plus, Edit2, Trash2, Package, DollarSign, TrendingUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  savings_goal: number;
  saved_amount: number;
  created_at: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: 0,
    savings_goal: 0,
  });

  const categories = ['Electronics', 'Education', 'Travel', 'Healthcare', 'Emergency', 'Entertainment', 'Other'];

  const userId = localStorage.getItem('unique_id') || "default_user";

  useEffect(() => {
    loadProducts();
  }, [userId]);

  const loadProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([
        { id: '1', name: 'MacBook Pro', category: 'Electronics', price: 450000, savings_goal: 450000, saved_amount: 150000, created_at: '2025-01-01' },
        { id: '2', name: 'University Fee', category: 'Education', price: 200000, savings_goal: 200000, saved_amount: 80000, created_at: '2025-01-01' },
        { id: '3', name: 'Emergency Fund', category: 'Emergency', price: 100000, savings_goal: 100000, saved_amount: 45000, created_at: '2025-01-01' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct 
        ? `http://localhost:8000/api/products/${userId}/${editingProduct.id}`
        : `http://localhost:8000/api/products/${userId}`;
      
      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadProducts();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving product:', error);
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        saved_amount: 0,
        created_at: new Date().toISOString(),
      };
      
      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
      } else {
        setProducts([...products, newProduct]);
      }
      setShowModal(false);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await fetch(`http://localhost:8000/api/products/${userId}/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      savings_goal: product.savings_goal,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: 'Electronics', price: 0, savings_goal: 0 });
  };

  const getProgress = (saved: number, goal: number) => Math.min((saved / goal) * 100, 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#dce4ed]">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="neumorphic p-8 text-center">
            <div className="animate-pulse text-gray-600">Loading products...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#dce4ed]">
      <Navbar />
      
      <main className="px-3 sm:px-6 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Savings Goals</h1>
            <p className="text-gray-500">Manage your savings products and goals</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="neumorphic-button px-6 py-3 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add New Goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="neumorphic p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Target Amount</span>
                  <span className="font-semibold text-gray-800">Rs. {product.price.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Saved</span>
                  <span className="font-semibold text-green-600">Rs. {product.saved_amount.toLocaleString()}</span>
                </div>

                <div className="neumorphic-inset h-3 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${getProgress(product.saved_amount, product.savings_goal)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {Math.round(getProgress(product.saved_amount, product.savings_goal))}% completed
                  </span>
                  <span className="text-xs text-gray-500">
                    Rs. {(product.savings_goal - product.saved_amount).toLocaleString()} remaining
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="neumorphic p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">No savings goals yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first savings goal</p>
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="neumorphic-button px-6 py-3 text-blue-600 font-medium"
            >
              Add Your First Goal
            </button>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="neumorphic p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingProduct ? 'Edit Savings Goal' : 'Add New Savings Goal'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., MacBook Pro"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (Rs.)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value), savings_goal: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                  min="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600"
                >
                  {editingProduct ? 'Save Changes' : 'Add Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
