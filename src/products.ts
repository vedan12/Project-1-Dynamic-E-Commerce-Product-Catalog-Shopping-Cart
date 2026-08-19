import type { Product, Category } from './types';

export const CATEGORIES: ('All' | Category)[] = [
  'All',
  'Footwear',
  'Apparel',
  'Accessories',
  'Equipment',
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: "Hogun Multi-Color Running Shoes",
    price: 1334,
    category: 'Footwear',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Lightweight running shoes built for everyday miles.',
    description:
      "Allow your pair of shoes to air and de-odorize on a regular basis — this also helps them retain their natural shape. Use shoe bags to prevent stains or mildew, and dust off any dry dirt from the surface.",
    rating: 4.5,
  },
  {
    id: 'p2',
    name: 'Striker Cricket Spikes',
    price: 2499,
    category: 'Footwear',
    image: 'https://images.pexels.com/photos/1170084/pexels-photo-1170084.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Grip-first spikes for the fast bowlers and sprinters.',
    description:
      'Reinforced ankle support and a rubber spike sole give you stable footing on the pitch, wet or dry.',
    rating: 4.7,
  },
  {
    id: 'p3',
    name: 'Dhoni Signature Jersey',
    price: 1899,
    category: 'Apparel',
    image: 'https://images.pexels.com/photos/8007401/pexels-photo-8007401.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Breathable match jersey with a relaxed athletic cut.',
    description:
      'Moisture-wicking polyester keeps you cool through long innings. Machine washable, colour-fast fabric.',
    rating: 4.8,
  },
  {
    id: 'p4',
    name: 'Yellow Army Track Pants',
    price: 1299,
    category: 'Apparel',
    image: 'https://images.pexels.com/photos/6311606/pexels-photo-6311606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Stretch-fit training pants with zip pockets.',
    description:
      'A tapered fit built for warmups and travel days alike, with a hidden zip pocket for essentials.',
    rating: 4.4,
  },
  {
    id: 'p5',
    name: 'Thala Cap #7',
    price: 599,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Adjustable cotton cap with embroidered No. 7.',
    description:
      'A classic six-panel cap with a curved brim and breathable eyelets for long days under the sun.',
    rating: 4.6,
  },
  {
    id: 'p6',
    name: 'Captain Cool Wristbands',
    price: 349,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/8007371/pexels-photo-8007371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Sweat-absorbing wristband pair for match days.',
    description:
      'Soft terry-cloth wristbands that keep sweat out of your eyes during long spells at the crease.',
    rating: 4.3,
  },
  {
    id: 'p7',
    name: 'English Willow Bat',
    price: 8999,
    category: 'Equipment',
    image: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Grade 1 willow with a mid-swell profile.',
    description:
      'Hand-pressed and finished with a natural oil coat — a balanced pick-up built for power hitters.',
    rating: 4.9,
  },
  {
    id: 'p8',
    name: 'Pro Batting Gloves',
    price: 1799,
    category: 'Equipment',
    image: 'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Layered foam protection with a flexible palm.',
    description:
      'Multi-density foam padding on the back of the hand with a soft leather palm for grip and feel.',
    rating: 4.5,
  },
  {
    id: 'p9',
    name: 'Trailhead Kit Backpack',
    price: 2199,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/2062326/pexels-photo-2062326.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Weatherproof 35L kit bag with a bat sleeve.',
    description:
      'Room for full match kit plus a padded bat compartment and vented shoe pocket.',
    rating: 4.6,
  },
  {
    id: 'p10',
    name: 'Classic Cricket Helmet',
    price: 3499,
    category: 'Equipment',
    image: 'https://images.pexels.com/photos/3800119/pexels-photo-3800119.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb: 'Titanium-grille helmet rated for pace bowling.',
    description:
      'A lightweight ABS shell with an adjustable dial-fit system and a titanium-alloy grille.',
    rating: 4.7,
  },
];
