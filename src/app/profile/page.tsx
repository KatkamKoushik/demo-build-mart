"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, MapPin, Phone, ArrowLeft, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load from local storage if available
    const savedProfile = localStorage.getItem("buildmart_profile");
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("buildmart_profile", JSON.stringify(formData));
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-alabaster pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-muted hover:text-charcoal transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-charcoal/5 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-charcoal/50" />
            </div>
            <h1 className="text-2xl font-medium text-charcoal">Your Profile</h1>
            <p className="text-muted text-sm">Manage your account details and shipping address</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-charcoal flex items-center gap-2">
                  <User className="w-4 h-4 text-muted" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-alabaster border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-charcoal"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-charcoal flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted" /> Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-alabaster border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-charcoal"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted" /> Phone Number
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-alabaster border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-charcoal"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted" /> Default Shipping Address
              </label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Enter your complete delivery address..."
                className="w-full px-4 py-3 bg-alabaster border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-charcoal resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-charcoal text-white rounded-xl font-medium hover:bg-charcoal-light transition-colors flex items-center justify-center gap-2"
            >
              {isSaved ? (
                <><CheckCircle className="w-5 h-5" /> Saved Successfully</>
              ) : (
                "Save Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
