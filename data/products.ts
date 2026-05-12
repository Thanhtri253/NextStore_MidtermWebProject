import { Product } from "@/types";

const U = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&auto=format&fit=crop&q=80`;

export const PRODUCTS: Product[] = [
  { id:1,  name:"AirPods Pro 2nd Gen",       price:249,  category:"Audio",      image:U("1606220945770-b5b6c2c55bf1"), description:"Active Noise Cancellation, Transparency mode, Adaptive EQ. Up to 30 hours total battery. H2 chip for smarter noise cancellation and a more customised sound.",                stock:42, rating:4.8, reviews:2341, badge:"Best Seller" },
  { id:2,  name:"Sony WH-1000XM5",            price:348,  category:"Audio",      image:U("1505740420928-5e560c06d30e"), description:"Industry-leading noise canceling with 8 microphones. 30-hour battery, multipoint connection, and crystal clear hands-free calling.",                                         stock:28, rating:4.7, reviews:1872, badge:"" },
  { id:3,  name:"Bose QuietComfort 45",       price:279,  category:"Audio",      image:U("1484704849700-f032a568e944"), description:"Proprietary noise canceling technology, 24-hour battery life, lightweight with cushioned ear cups. Balanced Mode for clearer sound.",                                      stock:19, rating:4.6, reviews:1105, badge:"" },
  { id:4,  name:"MacBook Pro M3",             price:1999, category:"Laptops",    image:U("1517336714731-489689fd1ca8"), description:"Apple M3 Pro chip, 12-core CPU, 18-core GPU, 18GB unified memory. Liquid Retina XDR display, up to 22 hours battery life. MagSafe 3 charging.",                        stock:14, rating:4.9, reviews:876,  badge:"New" },
  { id:5,  name:"MacBook Air M2",             price:1099, category:"Laptops",    image:U("1611532736597-de2d4265fba3"), description:"Impossibly thin with M2 chip, 8-core CPU and 10-core GPU. Fanless, silent operation. 18-hour battery life and 35W dual USB-C port adapter.",                            stock:22, rating:4.8, reviews:2043, badge:"Popular" },
  { id:6,  name:"Dell XPS 15",                price:1499, category:"Laptops",    image:U("1593642632559-0c6d3fc62b89"), description:"Intel Core i7 13th Gen, NVIDIA RTX 4060, 15.6\" OLED display, 64GB RAM, 1TB SSD. The ultimate Windows creative laptop.",                                                stock:11, rating:4.5, reviews:634,  badge:"" },
  { id:7,  name:"iPhone 16 Pro",              price:999,  category:"Phones",     image:U("1510557880182-3d4d3cba35a5"), description:"A18 Pro chip, Camera Control, 5x optical zoom, ProMotion always-on display, Action Button. Titanium design with USB-C connectivity.",                                   stock:65, rating:4.7, reviews:5120, badge:"New" },
  { id:8,  name:"Samsung Galaxy S24 Ultra",   price:1299, category:"Phones",     image:U("1598327105666-5b89351aff97"), description:"200MP camera, built-in S Pen, 12GB RAM, titanium frame, 5000mAh battery with 45W fast charging. Galaxy AI built-in for everyday tasks.",                               stock:33, rating:4.6, reviews:3210, badge:"" },
  { id:9,  name:"Google Pixel 9 Pro",         price:899,  category:"Phones",     image:U("1511707171634-5f897ff02aa9"), description:"Google Tensor G4 chip, 50MP main camera with Magic Eraser, 7 years of OS updates, 120Hz LTPO display, wireless charging.",                                            stock:27, rating:4.5, reviews:987,  badge:"" },
  { id:10, name:"Apple Watch Series 10",      price:399,  category:"Wearables",  image:U("1579586337278-3befd40fd17a"), description:"Thinnest Apple Watch ever. Blood oxygen sensor, ECG app, Crash Detection, temperature sensing. Up to 36 hours in Low Power Mode.",                                     stock:38, rating:4.6, reviews:1432, badge:"New" },
  { id:11, name:"Samsung Galaxy Watch 7",     price:299,  category:"Wearables",  image:U("1523275335684-37898b6baf30"), description:"Advanced BioActive Sensor, 3nm processor, sleep coaching, Body Composition analysis. Up to 40 hours battery with power saving.",                                       stock:24, rating:4.4, reviews:721,  badge:"" },
  { id:12, name:"iPad Pro M4",                price:799,  category:"Tablets",    image:U("1544244015-0df4b3ffc6b0"), description:"M4 chip, Ultra Retina XDR OLED display, Apple Pencil Pro support. Thinnest Apple product ever at just 5.1mm. Perfect for creative professionals.",                       stock:27, rating:4.8, reviews:943,  badge:"New" },
  { id:13, name:"Samsung Galaxy Tab S9+",     price:699,  category:"Tablets",    image:U("1561154464-82e9adf32764"), description:"12.4\" Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, IP68, included S Pen, 10090mAh battery with 45W charging.",                                                        stock:16, rating:4.5, reviews:512,  badge:"" },
  { id:14, name:"PlayStation 5 Slim",         price:499,  category:"Gaming",     image:U("1606144042614-b2417e99c4e3"), description:"PS5 Slim with 1TB SSD, 4K gaming at up to 120fps, ray tracing, DualSense controller with haptic feedback and adaptive triggers.",                                      stock:8,  rating:4.9, reviews:4231, badge:"Hot" },
  { id:15, name:"Nintendo Switch OLED",       price:349,  category:"Gaming",     image:U("1578303512597-81e6cc155b3e"), description:"7\" vivid OLED screen, wide adjustable stand, 64GB internal storage, enhanced audio, dock with wired LAN port. Play anywhere.",                                         stock:20, rating:4.7, reviews:2876, badge:"" },
  { id:16, name:"HomePod 2nd Gen",            price:299,  category:"Smart Home", image:U("1545454675-3531b543be5d"), description:"Spatial Audio with Dolby Atmos, Room Sensing technology, S9 chip, smart home hub with Matter support. Works with Apple Music and Siri.",                                  stock:15, rating:4.5, reviews:612,  badge:"" },
  { id:17, name:"Amazon Echo (4th Gen)",      price:99,   category:"Smart Home", image:U("1543512214-318c7553f230"), description:"Premium sound, Alexa built-in, smart home hub with Zigbee and eero Wi-Fi built-in. Spherical design in multiple colors.",                                                 stock:50, rating:4.4, reviews:8920, badge:"" },
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export const CATEGORIES = [
  "All","Audio","Laptops","Phones","Wearables","Tablets","Gaming","Smart Home",
];
