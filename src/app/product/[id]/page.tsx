import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-charcoal/5 min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8">
            {/* If there was an image, we'd render it here */}
            <div className="text-charcoal/20 text-9xl font-bold">
              {product.name.charAt(0)}
            </div>
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="uppercase tracking-widest text-primary text-sm font-bold mb-2">
              {product.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">
              {product.name}
            </h1>
            <p className="text-xl font-semibold text-charcoal mb-6">
              ₹{product.price.toLocaleString('en-IN')} <span className="text-muted text-lg font-normal">/ {product.unit}</span>
            </p>
            <p className="text-muted mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.in_stock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
