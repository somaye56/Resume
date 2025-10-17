"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { toast } from "react-toastify";

import LineComponent from "@/components/elements/LineComponent";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Card from "../elements/Card";

const ContactSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(100, "بسیار طولانی است"),
  email: z.string().email("ایمیل معتبر نیست"),
  message: z.string().min(5, "پیام باید حداقل ۵ کاراکتر باشد").max(2000, "پیام بسیار طولانی است"),
});

type ContactFormData = z.infer<typeof ContactSchema>;

interface ApiResponse {
  success: boolean;
  message: string;
}

const ContactPage: React.FC = () => {
  const Contact = useTranslations("contact");
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = async (values: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      const text = await res.text();
      let data: ApiResponse;
      try {
        data = JSON.parse(text);
      } catch {
        toast.error("پاسخ سرور JSON معتبر نیست");
        return;
      }

      if (data.success) {
        toast.success(data.message || "پیام با موفقیت ارسال شد");
        reset();
      } else {
        toast.error(data.message || "ارسال ناموفق بود");
      }
    } catch (error) {
      console.error(error);
      toast.error("ارسال ناموفق بود. دوباره امتحان کنید.");
    }
  };

  return (
    <section >
      <div className=" text-center">
        <h2 className="text-2xl font-bold mt-6 mb-3 inline-block ">
          {Contact("title")}
        </h2>
      </div>
      <LineComponent className="mb-6" />
      <Card 
      >
 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <div >
            <label className="block mb-1 text-sm font-medium" htmlFor="name">
              {Contact("name") || "Name"}
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              aria-invalid={!!errors.name}
              placeholder={Contact("namePlaceholder") || (locale === "fa" ? "نام" : "Name")}
              dir={locale === "fa" ? "rtl" : "ltr"}
              className={`w-full border-b border-text-muted p-2 rounded 
    placeholder:text-slate-400 
    ${locale === "fa" ? "text-right placeholder:text-right" : "text-left placeholder:text-left"} 
    ${errors.name ? "border-red-500" : ""}`}
            />


            {errors.name && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div >
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              {Contact("email") || "Email"}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              placeholder={Contact("emailPlaceholder") || (locale === "fa" ? "نام" : "Email")}
              dir={locale === "fa" ? "rtl" : "ltr"}
              className={`w-full border-b border-text-muted p-2 rounded ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div >
            <label className="block mb-1 text-sm font-medium" htmlFor="message">
              {Contact("message") || "Message"}
            </label>
            <textarea
              id="message"
              {...register("message")}
              aria-invalid={!!errors.message}
              placeholder={Contact("messagePlaceholder") || (locale === "fa" ? "نام" : "Message")}
              dir={locale === "fa" ? "rtl" : "ltr"}
              className={`w-full border-b border-text-muted p-2 rounded ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.message && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>
          <div className={`flex items-end ${locale === 'fa' || locale === 'ar' ? 'justify-start' : 'justify-end'}`}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-4 py-2 bg-gradient-to-r from-custom-red to-custom-brown hover:from-custom-orange] hover:to-custom-brown text-custom-text]  text-sm rounded-xl shadow-lg transition-all duration-300 transform  hover:shadow-xl"
            >
              {isSubmitting ? (Contact("sending") || "در حال ارسال...") : (Contact("send") || "ارسال")}
            </button>
          </div>

        </form>

      </Card>

    </section>
  );
};

export default ContactPage;
