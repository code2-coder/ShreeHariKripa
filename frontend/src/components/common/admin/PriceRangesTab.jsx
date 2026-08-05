import React, { useState } from "react";
import { Trash2, Edit2, Coins, Plus, HelpCircle, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import api from "../../../api/axios";

export function PriceRangesTab({ priceRanges, setPriceRanges }) {
  const [formData, setFormData] = useState({
    min: "",
    max: "",
    label: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ min: "", max: "", label: "" });
    setEditingId(null);
  };

  const handleEdit = (range) => {
    setEditingId(range._id);
    setFormData({
      min: range.min,
      max: range.max !== null && range.max !== undefined ? range.max : "",
      label: range.label || ""
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (formData.min === "") {
      toast.error("Minimum price is required");
      return;
    }

    const minNum = Number(formData.min);
    if (isNaN(minNum) || minNum < 0) {
      toast.error("Minimum price must be 0 or greater");
      return;
    }

    let maxVal = null;
    if (formData.max !== "") {
      const maxNum = Number(formData.max);
      if (isNaN(maxNum) || maxNum <= minNum) {
        toast.error("Maximum price must be greater than minimum price");
        return;
      }
      maxVal = maxNum;
    }

    setLoading(true);
    try {
      const payload = {
        min: minNum,
        max: maxVal,
        label: formData.label || undefined
      };

      if (editingId) {
        const { data } = await api.put(`/admin/price-ranges/${editingId}`, payload);
        if (data.success) {
          setPriceRanges(prev => 
            prev.map(r => r._id === editingId ? data.priceRange : r).sort((a, b) => a.min - b.min)
          );
          toast.success("Price range updated successfully!");
        }
      } else {
        const { data } = await api.post("/admin/price-ranges", payload);
        if (data.success) {
          setPriceRanges(prev => 
            [...prev, data.priceRange].sort((a, b) => a.min - b.min)
          );
          toast.success("Price range created!");
        }
      }
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save price range");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this price range?")) return;
    try {
      const { data } = await api.delete(`/admin/price-ranges/${id}`);
      if (data.success) {
        setPriceRanges(prev => prev.filter(r => r._id !== id));
        toast.success("Price range deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete price range");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Price Range Manager</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Configure price brackets that users see in the sidebar filters on the Shop page.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Form */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-black text-slate-800 mb-6">
              {editingId ? "Edit Price Range" : "Add Price Range"}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  placeholder="e.g. 500"
                  value={formData.min}
                  onChange={(e) => setFormData(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center justify-between">
                  <span>Max Price (₹)</span>
                  <span className="text-[9px] font-semibold text-amber-600 normal-case">Leave empty for "Above"</span>
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 1000 (optional)"
                  value={formData.max}
                  onChange={(e) => setFormData(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">
                  Custom Label (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Budget Collection"
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-800"
                />
                <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                  If left blank, the label will automatically format (e.g. "₹500 to ₹1,000" or "Above ₹4,000").
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors duration-200 shadow-md shadow-amber-600/10 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  {editingId ? "Update Range" : "Create Range"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Table / List */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-600" /> Active Price Bands
            </h3>
            <span className="bg-slate-200/60 text-slate-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
              {priceRanges.length} Bands
            </span>
          </div>

          <div className="overflow-x-auto">
            {priceRanges.length === 0 ? (
              <div className="p-12 text-center">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No price ranges configured yet.</p>
                <p className="text-slate-400 text-xs mt-1">Create your first price band using the form.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Range (₹)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Default Display Label</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {priceRanges.map((range) => {
                    const isAbove = range.max === null || range.max === undefined;
                    const autoLabel = isAbove 
                      ? `Above ₹${range.min.toLocaleString()}`
                      : `₹${range.min.toLocaleString()} to ₹${range.max.toLocaleString()}`;

                    return (
                      <tr 
                        key={range._id} 
                        className={`group hover:bg-slate-50/50 transition-colors ${editingId === range._id ? "bg-amber-50/30" : ""}`}
                      >
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-semibold text-slate-800">
                              ₹{range.min.toLocaleString()} - {isAbove ? "∞" : `₹${range.max.toLocaleString()}`}
                            </span>
                            {isAbove && (
                              <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                Above Max
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium text-slate-800">
                              {range.label || autoLabel}
                            </p>
                            {range.label && (
                              <p className="text-[10px] text-slate-400 font-medium">
                                Auto: {autoLabel}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4.5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(range)}
                              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Edit Range"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(range._id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Range"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
