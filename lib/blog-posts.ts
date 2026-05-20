/**
 * 📝 博客文章数据
 * 
 * 新增文章步骤：
 *   1. 图片放到 public/images/blog/（可选）
 *   2. 在这个文件里加一条记录
 *   3. 重新构建 → 自动生成文章页面
 * 
 * 后续迁移到 WordPress：只需改这个文件的读取来源
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  tags: string[];
}

const blogBase = "/images/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "wholesale-t-shirt-quality-guide",
    title: "The Complete Guide to Wholesale T-Shirt Quality",
    excerpt: "Learn how to evaluate blank t-shirt quality — fabric weight, construction, and what matters for your brand.",
    content: `
When sourcing blank t-shirts for your brand, quality isn't just about how a garment looks — it's about how it holds up after its 10th wash, how it takes a print, and how your customers feel wearing it.

## What is GSM and Why Does It Matter?

GSM (grams per square meter) measures fabric weight. For t-shirts:

- **180-200gsm** — Lightweight, breathable, ideal for layering and hot weather
- **220-260gsm** — Mid-weight, the sweet spot for most brands
- **280-360gsm** — Heavyweight, premium feel, drapes well

## Fabric Construction: Combed vs. Carded Cotton

Combed ring-spun cotton goes through an extra process that removes short fibers and aligns longer ones. The result is a smoother, stronger, and more comfortable fabric that takes prints better.

## Key Construction Details

1. **Side seams** — A sign of quality. Tubular knits twist after washing.
2. **Neck tape** — Reinforces the shoulder seam and prevents stretching.
3. **Double-needle stitching** — Adds durability to hems and seams.

## What to Look For in a Wholesale Partner

- Consistent quality across batches
- OEKO-TEX certification for fabric safety
- Transparent pricing with no hidden fees
- MOQ that matches your business stage

At BOAZ, every garment we produce meets these standards. We don't cut corners — we've been doing this for three generations.
    `,
    date: "2025-03-15",
    author: "BOAZ Team",
    category: "Quality Guide",
    tags: ["wholesale", "quality", "t-shirts", "fabric guide"],
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80",
  },
  {
    id: "2",
    slug: "screen-printing-vs-dtg",
    title: "Screen Printing vs. DTG: Which Is Right for Your Brand?",
    excerpt: "A detailed comparison of production methods, minimums, costs, and quality outcomes.",
    content: `
Choosing the right printing method for your custom apparel can make or break your product margins and customer satisfaction.

## Screen Printing

**Best for:** Large quantities, simple designs, solid colors

- Setup cost: Higher (screen creation per color)
- Per-unit cost: Lower at scale
- Color limit: Each color requires a separate screen
- Durability: Excellent — ink bonds with fabric fibers
- Minimum: Typically 50+ pieces per design

## DTG (Direct-to-Garment)

**Best for:** Small quantities, full-color designs, detailed artwork

- Setup cost: Minimal (digital file only)
- Per-unit cost: Higher than screen printing at scale
- Color limit: Unlimited — prints like a desktop printer
- Durability: Good, but less vibrant on dark garments
- Minimum: 1 piece — no setup required

## Which One Should You Choose?

| Factor | Screen Printing | DTG |
|--------|---------------|-----|
| Quantity | 50+ units | 1-50 units |
| Colors per design | 1-6 | Unlimited |
| Cost per piece (200 units) | ~$3-5 | ~$6-10 |
| Best for | Uniforms, merch, basics | Art prints, photos, small runs |

At BOAZ, we offer both methods. Our production team will recommend the best approach for your specific project.
    `,
    date: "2025-02-20",
    author: "BOAZ Team",
    category: "Printing Guide",
    tags: ["screen printing", "DTG", "custom printing", "apparel decoration"],
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
  },
  {
    id: "3",
    slug: "choose-blank-hoodie-customization",
    title: "How to Choose the Right Blank Hoodie for Customization",
    excerpt: "From fleece weight to pocket styles — everything you need to know before ordering custom hoodies.",
    content: `
Hoodies are one of the most popular items for custom apparel — they're comfortable, universally worn, and offer plenty of space for branding.

## Fleece Weight Guide

- **300-350gsm** — Standard weight, good for layering
- **360-400gsm** — Heavyweight, premium feel, holds structure
- **400gsm+** — Ultra-heavy, streetwear favorite

## Key Hoodie Features

1. **Pocket style** — Kangaroo pouch vs. welt pockets
2. **Hood construction** — Lined vs. unlined, drawstring type
3. **Ribbing** — Cuff and hem quality affects longevity
4. **Fit** — Regular vs. oversized vs. cropped

## Our 360gsm Washed Crewneck

Our best-selling hoodie is washed for a vintage feel right out of the box. The 360gsm weight provides structure without being stiff, and the oversized fit works perfectly for screen printing and embroidery.
    `,
    date: "2025-01-10",
    author: "BOAZ Team",
    category: "Product Guide",
    tags: ["hoodies", "fleece", "custom apparel", "heavyweight"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
  },
  {
    id: "4",
    slug: "minimum-order-quantities-explained",
    title: "Minimum Order Quantities Explained for Apparel Brands",
    excerpt: "Understanding MOQs, how they work, and tips for negotiating with manufacturers.",
    content: `
MOQ (Minimum Order Quantity) is one of the first questions new brands ask. Here's what you need to know.

## Why Do Manufacturers Have MOQs?

Fabric, thread, and trim all come in minimums from suppliers. Setting up a production line takes time. An MOQ ensures both sides can operate profitably.

## Typical MOQ Ranges

- **Blank wholesale:** 50-100 pieces per style/color
- **Custom cut-and-sew:** 200-500 units per design
- **Custom printing (on our blanks):** 50-200 units per design
- **Samples:** Usually 1-5 pieces (often paid separately)

## Tips for Working with MOQs

1. Mix colors within the same style to hit minimums
2. Order combined products if the factory allows
3. Ask about stock programs — we keep popular blanks in inventory
4. Start with a trial order and scale up

At BOAZ, we work with brands of all sizes. Our MOQ of 50 pieces per style makes us accessible to startups while our capacity handles Amazon sellers ordering 30,000+ units.
    `,
    date: "2024-12-05",
    author: "BOAZ Team",
    category: "Business Guide",
    tags: ["MOQ", "minimum order", "wholesale", "startup"],
    image: "https://images.unsplash.com/photo-1553729459-afe8f2e2e9b0?w=800&q=80",
  },
  {
    id: "5",
    slug: "sustainable-fashion-bulk-orders",
    title: "Sustainable Fabric Options for Wholesale Orders",
    excerpt: "Explore eco-friendly fabric options and certifications available for bulk apparel manufacturing.",
    content: `
Sustainability is no longer optional — it's what buyers expect. Here are the eco-friendly options we offer.

## Sustainable Fabric Options

- **Organic Cotton** — Grown without pesticides, GOTS certified
- **Recycled Polyester** — Made from post-consumer plastic bottles
- **Hemp Blends** — Requires less water than cotton
- **TENCEL™ Lyocell** — Made from sustainably harvested wood pulp

## Certifications That Matter

- **OEKO-TEX Standard 100** — Tested for harmful substances (all our products)
- **GOTS** — Global Organic Textile Standard (organic options)
- **BCI** — Better Cotton Initiative (sourced responsibly)

## Cost Considerations

Sustainable fabrics typically cost 15-30% more than conventional options. However, many brands find customers willing to pay a premium for eco-friendly products.
    `,
    date: "2024-11-18",
    author: "BOAZ Team",
    category: "Sustainability",
    tags: ["sustainable", "eco-friendly", "organic cotton", "recycled"],
  },
  {
    id: "6",
    slug: "private-label-apparel-guide",
    title: "Private Label Apparel: Building Your Clothing Brand",
    excerpt: "A step-by-step guide to launching a private label clothing line with a manufacturing partner.",
    content: `
Private label apparel is the fastest way to launch a clothing brand without building a factory.

## Step 1: Define Your Product

Choose your core product: t-shirts? hoodies? Start with one style in 3-5 colors and 4-6 sizes.

## Step 2: Request Samples

Before committing to a full order, request samples to verify quality, fit, and color accuracy.

## Step 3: Customize Your Branding

- Neck labels with your logo
- Custom hang tags
- Care labels with your brand name
- Poly bags or retail-ready packaging

## Step 4: Place Your Production Order

Once samples are approved, your production order goes into our queue. Typical timeline: 10-15 business days for 200-500 units.

## Step 5: Quality Check & Ship

Every order goes through our 4-stage QC process before shipping.
    `,
    date: "2024-10-22",
    author: "BOAZ Team",
    category: "Business Guide",
    tags: ["private label", "clothing brand", "startup", "custom manufacturing"],
    image: "https://images.unsplash.com/photo-1558769132-cb1f45843fc9?w=800&q=80",
  },
  {
    id: "7",
    slug: "direct-to-garment-printing",
    title: "DTG Printing: Full-Color Custom Apparel Made Simple",
    excerpt: "Direct-to-garment printing brings full-color, photo-quality designs to fabric with zero setup fees. Perfect for small runs and complex artwork.",
    content: `
DTG (Direct-to-Garment) printing works like a high-end inkjet printer — but instead of paper, it prints directly onto fabric.

## How It Works

1. **Pre-treatment** — A clear solution is applied to the garment to help ink bond with fibers
2. **Printing** — The garment is loaded onto a platen and the print head applies water-based ink
3. **Curing** — Heat sets the ink permanently into the fabric

## Best Applications

- Small runs (1-50 pieces)
- Full-color designs with gradients and photos
- Detailed artwork with fine lines
- Sample runs before mass production

## Pros & Cons

| Factor | Rating |
|--------|--------|
| Color complexity | Excellent — unlimited colors |
| Setup cost | Low — no screens to make |
| Per-piece cost (50+) | $3-7 |
| Durability | Good — bonds with fabric |
| Best fabric | 100% cotton, high-content cotton blends |

## Is DTG Right for Your Brand?

DTG is ideal for brands that need small quantities of highly detailed designs. If you're testing a new design or need a quick sample run, DTG is the fastest route from file to finished garment.
    `,
    date: "2025-05-18",
    author: "BOAZ Team",
    category: "Printing Guide",
    tags: ["DTG", "direct-to-garment", "digital printing", "custom apparel"],
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
  },
  {
    id: "8",
    slug: "embroidery-apparel-guide",
    title: "Embroidery: Premium Branding for Your Apparel Line",
    excerpt: "Embroidery adds a tactile, premium feel to any garment. Learn about stitch counts, thread types, and placement options.",
    content: `
Embroidery is the gold standard for premium apparel branding. Unlike printing which sits on top of the fabric, embroidery stitches thread directly into the material.

## How Embroidery Works

1. **Digitizing** — Your logo or design is converted into a stitch file (.dst, .pes)
2. **Hooping** — The garment is stretched in a hoop to keep the fabric taut
3. **Stitching** — The embroidery machine follows the digitized pattern, applying thread colors one at a time
4. **Trimming** — Loose threads are cut and the garment is inspected

## Best Applications

- Chest logos on polo shirts and uniforms
- Hats and caps
- Jackets and outerwear
- Corporate apparel

## Stitch Count Guide

| Placement | Typical Stitches | Cost Factor |
|-----------|-----------------|-------------|
| Left chest (3-4\") | 5,000-8,000 | 1x |
| Full front (10-12\") | 15,000-25,000 | 2-3x |
| Hat front | 3,000-5,000 | 1.5x |

## Thread Colors vs Print Colors

Embroidery is limited to about 15 thread colors per design (practical limit). Each color change requires a thread swap. Keep your design to 3-6 colors for the best balance of cost and visual impact.

At BOAZ, we offer embroidery on all heavyweight garments — chest, sleeve, back, and hat placements available.
    `,
    date: "2025-05-18",
    author: "BOAZ Team",
    category: "Printing Guide",
    tags: ["embroidery", "stitching", "branding", "premium apparel"],
    image: "https://images.unsplash.com/photo-1591129841193-b87320846256?w=800&q=80",
  },
  {
    id: "9",
    slug: "heat-transfer-printing",
    title: "Heat Transfer: Customization Without Minimums",
    excerpt: "Heat transfer printing offers unlimited colors, no setup fees, and runs as small as one piece. The complete guide.",
    content: `
Heat transfer (also called DTF — Direct to Film) is one of the most versatile decoration methods available today.

## How It Works

1. **Print** — Your design is printed onto a special transfer film (reverse image)
2. **Apply adhesive** — A hot-melt adhesive powder is applied to the printed film
3. **Cure** — The powder is melted to activate the adhesive
4. **Press** — The film is placed on the garment and pressed with heat (typically 300-320°F for 15-20 seconds)
5. **Peel** — The film is removed, leaving the design bonded to the fabric

## Best Applications

- Small runs (1-100 pieces)
- Full-color designs with gradients
- Photographic images
- Multi-color logos
- Garments with tags, buttons, or zippers (where screens can't reach)

## DTF vs Traditional Heat Press

| Feature | DTF (Modern) | Traditional Vinyl |
|--------|-------------|-------------------|
| Colors | Unlimited | Limited per layer |
| Detail | Photo-quality | Block colors only |
| Stretch | Excellent | May crack |
| Minimum order | 1 piece | 1 piece |
| Cost for 1-10 pcs | $5-10/pc | $5-15/pc |

DTF heat transfer is available on all BOAZ blank garments. No minimums for sample runs.
    `,
    date: "2025-05-18",
    author: "BOAZ Team",
    category: "Printing Guide",
    tags: ["heat transfer", "DTF", "sublimation", "custom printing"],
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
  },
  {
    id: "10",
    slug: "screen-printing-wholesale",
    title: "Screen Printing: The Industry Standard for Volume",
    excerpt: "Screen printing delivers vibrant, durable prints at scale. The go-to method for bulk orders, uniforms, and merch.",
    content: `
Screen printing has been the workhorse of apparel decoration for decades. It accounts for over 60% of all custom garment decoration worldwide.

## How It Works

1. **Artwork separation** — Each color in the design is separated into its own layer
2. **Screen creation** — A mesh screen is coated with emulsion and exposed with UV light, creating a stencil
3. **Setup** — Screens are mounted on the press, and ink is applied to each screen
4. **Printing** — A squeegee forces ink through the mesh onto the garment — one screen per color
5. **Curing** — The garment passes through a dryer to cure the ink permanently

## Best Applications

- Large quantities (50-10,000+ pieces)
- Simple designs with 1-6 colors
- Solid colors and spot colors
- Event merchandise and uniforms
- Bulk orders for e-commerce brands

## Cost Breakdown (500 pieces)

| Item | Cost |
|-----|------|
| Screen setup (per color) | $25-50 |
| Per-piece print (1 color) | $2-4 |
| Per-piece print (4 colors) | $3-6 |
| Per-piece print (6 colors) | $4-8 |

## Why Screen Printing Still Dominates

For quantities over 50 pieces, screen printing offers the best cost-per-piece of any method. The inks are thicker and more durable than digital methods. Colors are vibrant and last the lifetime of the garment.

At BOAZ, our production lines handle screen printing up to 6 colors with precision registration. We print on our own blanks for consistent quality from fabric to finished product.
    `,
    date: "2025-05-18",
    author: "BOAZ Team",
    category: "Printing Guide",
    tags: ["screen printing", "silkscreen", "bulk printing", "apparel decoration"],
    image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=800&q=80",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map(p => p.category))];
}
