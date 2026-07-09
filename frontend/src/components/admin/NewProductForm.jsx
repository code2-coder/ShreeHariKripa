import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import api from '../../api/axios';
import {
  ProductInformation,
  ProductSpecifications,
  VariantManager,
  ParentMediaUploader,
  StickySaveBar,
  ProductFeatures
} from './ProductFormComponents';

export default function NewProductForm({
  editingProduct,
  onClose,
  products,
  setProducts,
  categories,
  setCategories,
  attributes,
  setAttributes
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [productType, setProductType] = useState(editingProduct && editingProduct.variants?.length > 0 ? 'variant' : 'single');

  const methods = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      homeSection: '',
      status: 'draft',
      images: [],
      videos: [],
      variants: [],
      features: [],
      // Product Specifications
      material: '',
      metal: '',
      stoneType: '',
      finish: '',
      color: '',
      theme: '',
      style: '',
      pattern: '',
      shape: '',
      weight: '',
      dimensions: '',
      countryOfOrigin: '',
    }
  });

  useEffect(() => {
    if (editingProduct) {
      // Deep clone and strip _id to avoid react-hook-form useFieldArray key conflicts
      const cleanVariants = (editingProduct.variants || []).map(v => {
        const { _id, id, ...rest } = v;
        return {
          ...rest,
          images: rest.images?.map(img => { const { _id, id, ...imgRest } = img; return imgRest; }) || [],
          videos: rest.videos?.map(vid => { const { _id, id, ...vidRest } = vid; return vidRest; }) || [],
          sizes: rest.sizes?.map(size => { const { _id, id, ...sizeRest } = size; return sizeRest; }) || []
        };
      });

      methods.reset({
        name: editingProduct.name || '',
        description: editingProduct.description || '',
        category: editingProduct.category?._id || editingProduct.category || '',
        price: editingProduct.price || '',
        stock: editingProduct.stock || '',
        homeSection: editingProduct.homeSection || '',
        status: editingProduct.status || 'draft',
        images: editingProduct.images || [],
        videos: editingProduct.videos || [],
        variants: cleanVariants,
        features: editingProduct.features || [],
        // Product Specifications
        material: editingProduct.material || '',
        metal: editingProduct.metal || '',
        stoneType: editingProduct.stoneType || '',
        finish: editingProduct.finish || '',
        color: editingProduct.color || '',
        theme: editingProduct.theme || '',
        style: editingProduct.style || '',
        pattern: editingProduct.pattern || '',
        shape: editingProduct.shape || '',
        weight: editingProduct.weight || '',
        dimensions: editingProduct.dimensions || '',
        countryOfOrigin: editingProduct.countryOfOrigin || '',
      });
    }
  }, [editingProduct, methods]);

  const onSubmit = async (data) => {
    if (!data.name || !data.category) {
      toast.error("Please fill required fields (Name and Category)");
      return;
    }

    // Auto-calculate base price and stock from nested sizes for legacy support
    if (data.variants && data.variants.length > 0) {
      let minPrice = Infinity;
      let totalStock = 0;
      data.variants.forEach(variant => {
        if (variant.sizes && variant.sizes.length > 0) {
          variant.sizes.forEach(size => {
            const price = Number(size.price) || 0;
            const stock = Number(size.stock) || 0;
            if (price < minPrice && price > 0) minPrice = price;
            totalStock += stock;
          });
        }
      });
      data.price = minPrice === Infinity ? 0 : minPrice;
      data.stock = totalStock;

      // Copy first variant's images to root for legacy components (like ProductCard)
      if (data.variants[0].images && data.variants[0].images.length > 0) {
        data.images = data.variants[0].images;
      }
    } else {
      data.price = data.price || 0;
      data.stock = data.stock || 0;
    }

    // Default seller
    data.seller = "Shreeharikripa";

    setIsSaving(true);
    try {
      if (editingProduct) {
        const res = await api.put(`/admin/products/${editingProduct._id}`, data);
        setProducts(products.map(p => p._id === editingProduct._id ? res.data.product : p));
        toast.success("Product updated successfully");
      } else {
        const res = await api.post(`/admin/products`, data);
        setProducts([res.data.product, ...products]);
        toast.success("Product created successfully");
      }
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to save product";
      toast.error(msg);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 border border-gray-200 shadow-lg rounded-3xl bg-white animate-in slide-in-from-top-4 fade-in duration-300 my-8 relative">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
        <button type="button" onClick={onClose} className="p-2.5 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <ProductInformation categories={categories} />

          {/* Product Type Toggle */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Type</h3>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${productType === 'single' ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="productType" value="single" className="sr-only" checked={productType === 'single'} onChange={() => setProductType('single')} />
                <span className={`font-bold ${productType === 'single' ? 'text-gray-900' : 'text-gray-500'}`}>Single Product</span>
              </label>
              <label className={`flex-1 flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${productType === 'variant' ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="productType" value="variant" className="sr-only" checked={productType === 'variant'} onChange={() => setProductType('variant')} />
                <span className={`font-bold ${productType === 'variant' ? 'text-gray-900' : 'text-gray-500'}`}>Product with Variants</span>
              </label>
            </div>
          </div>

          <ProductFeatures />

          <ProductSpecifications
            attributes={attributes}
            onCreateAttr={async (type, label, val) => {
              try {
                const { data } = await import('../../api/axios').then(m => m.default.post('/admin/attribute/new', { type, value: val }));
                if (setAttributes) setAttributes(prev => [...(prev || []), data.attribute]);
                methods.setValue(type === 'generalStyle' ? 'style' : type, val);
              } catch (err) {
                const { toast } = await import('sonner');
                toast.error(err.response?.data?.message || `Failed to add ${label}`);
              }
            }}
            onEditAttr={async (id, newValue) => {
              try {
                const { data } = await import('../../api/axios').then(m => m.default.put(`/admin/attribute/${id}`, { value: newValue }));
                if (setAttributes) setAttributes(prev => (prev || []).map(a => a._id === id ? data.attribute : a));
              } catch (err) {
                const { toast } = await import('sonner');
                toast.error(err.response?.data?.message || 'Failed to update');
              }
            }}
            onDeleteAttr={async (id) => {
              try {
                await import('../../api/axios').then(m => m.default.delete(`/admin/attribute/${id}`));
                if (setAttributes) setAttributes(prev => (prev || []).filter(a => a._id !== id));
              } catch (err) {
                const { toast } = await import('sonner');
                toast.error(err.response?.data?.message || 'Failed to delete');
              }
            }}
          />

          {productType === 'single' ? (
            <ParentMediaUploader />
          ) : (
            <VariantManager 
            attributes={attributes}
            onCreateAttr={async (type, label, val) => {
              try {
                const { data } = await import('../../api/axios').then(m => m.default.post('/admin/attribute/new', { type, value: val }));
                if (setAttributes) setAttributes(prev => [...(prev || []), data.attribute]);
                if (type === 'generalStyle') methods.setValue('style', val);
              } catch (err) {
                const { toast } = await import('sonner');
                toast.error(err.response?.data?.message || `Failed to add ${label}`);
              }
            }}
            onEditAttr={async (id, newValue) => {
              try {
                const { data } = await import('../../api/axios').then(m => m.default.put(`/admin/attribute/${id}`, { value: newValue }));
                if (setAttributes) setAttributes(prev => (prev || []).map(a => a._id === id ? data.attribute : a));
              } catch (err) {
                const { toast } = await import('sonner');
                toast.error(err.response?.data?.message || 'Failed to update');
              }
            }}
            onDeleteAttr={async (id) => {
              try {
                await import('../../api/axios').then(m => m.default.delete(`/admin/attribute/${id}`));
                if (setAttributes) setAttributes(prev => (prev || []).filter(a => a._id !== id));
              } catch (err) {
                const { toast } = await import('sonner');
                toast.error(err.response?.data?.message || 'Failed to delete');
              }
            }}
          />
          )}

          <StickySaveBar onCancel={onClose} isSaving={isSaving} />
        </form>
      </FormProvider>
    </div>
  );
}