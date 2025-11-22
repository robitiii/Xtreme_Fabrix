// import { Helmet } from "react-helmet-async";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import upholsteryImage from "@/assets/upholstery-work.jpg";
// import leatherImage from "@/assets/leather-restoration.jpg";
// import roofImage from "@/assets/roof-lining.jpg";
// import dashboardImage from "@/assets/dashboard-repair.png";
// import heroImage from "@/assets/hero-workshop.jpg";

// interface GalleryImage {
//   src: string;
//   alt: string;
//   category: string;
// }

// const Gallery = () => {
//   const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

//   const images: GalleryImage[] = [
//     { src: heroImage, alt: "Premium red leather interior", category: "luxury" },
//     { src: upholsteryImage, alt: "Custom seat upholstery detail", category: "sport" },
//     { src: leatherImage, alt: "Black leather with red stitching", category: "luxury" },
//     { src: roofImage, alt: "Roof lining replacement", category: "classic" },
//     { src: dashboardImage, alt: "Dashboard repair work", category: "sport" },
//     { src: upholsteryImage, alt: "Seat reupholstery process", category: "custom" },
//     { src: leatherImage, alt: "Leather restoration detail", category: "luxury" },
//     { src: heroImage, alt: "Complete interior transformation", category: "luxury" },
//   ];

//   const categories = ["all", "luxury", "sport", "classic", "custom"];

//   const filteredImages = (category: string) => {
//     if (category === "all") return images;
//     return images.filter((img) => img.category === category);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Gallery | Xtreme Fabrix Solutions</title>
//         <meta name="description" content="View our portfolio of automotive upholstery projects. Before and after transformations, custom interiors, and restoration work." />
//       </Helmet>

//       <div className="pt-20">
//         {/* Hero Section */}
//         <section className="py-20 bg-gradient-to-br from-background via-card to-background">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="max-w-4xl mx-auto text-center"
//             >
//               <h1 className="text-5xl md:text-6xl font-black mb-6">
//                 Our <span className="text-primary">Portfolio</span>
//               </h1>
//               <p className="text-xl text-muted-foreground">
//                 Explore our finest automotive interior transformations
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Gallery Section */}
//         <section className="py-20 bg-background">
//           <div className="container mx-auto px-4">
//             <Tabs defaultValue="all" className="w-full">
//               <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-12">
//                 <TabsTrigger value="all">All</TabsTrigger>
//                 <TabsTrigger value="luxury">Luxury</TabsTrigger>
//                 <TabsTrigger value="sport">Sport</TabsTrigger>
//                 <TabsTrigger value="classic">Classic</TabsTrigger>
//                 <TabsTrigger value="custom">Custom</TabsTrigger>
//               </TabsList>

//               {categories.map((category) => (
//                 <TabsContent key={category} value={category}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredImages(category).map((image, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.4, delay: index * 0.05 }}
//                         className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
//                         onClick={() => setSelectedImage(image)}
//                       >
//                         <img
//                           src={image.src}
//                           alt={image.alt}
//                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <div className="absolute bottom-0 left-0 right-0 p-6">
//                             <p className="text-foreground font-semibold">{image.alt}</p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </TabsContent>
//               ))}
//             </Tabs>
//           </div>
//         </section>

//         {/* Lightbox Dialog */}
//         <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
//           <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
//             {selectedImage && (
//               <div className="relative">
//                 <img
//                   src={selectedImage.src}
//                   alt={selectedImage.alt}
//                   className="w-full h-auto rounded-lg"
//                 />
//                 <p className="text-center text-foreground mt-4 text-lg font-semibold">
//                   {selectedImage.alt}
//                 </p>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </>
//   );
// };

// export default Gallery;
