import { BEAUTY, takeShots, uniqueQueue } from './pool.js'

const q = uniqueQueue(BEAUTY)

function item(cfg) {
  return {
    house: 'us',
    images: takeShots(q, 3),
    notes: cfg.notes,
    specs: cfg.specs,
    sizes: cfg.sizes,
    ...cfg
  }
}

const SHADES_LIP = ['Fair nude', 'Warm nude', 'Rose', 'Brick', 'Berry', 'Red', 'Plum']
const SHADES_FACE = ['Fair 1', 'Fair 2', 'Light 3', 'Light 4', 'Medium 5', 'Medium 6', 'Tan 7', 'Deep 8', 'Deep 9', 'Deep 10']
const ONE = ['One size']

export const usProducts = [
  item({ id: 'nude-architecture', cat: 'lips', name: 'Nude Architecture', line: 'Lips', price: 34, colour: 'SoHo nude', blurb: 'Sculpted nude. The mouth as architecture.', story: 'Warm nude with a New York undertone. Photographs in daylight and flash.', notes: ['Satin', 'Long wear', 'Vegan'], specs: ['3.6g', 'NYC', 'Magnetic cap', 'Refill'], sizes: SHADES_LIP }),
  item({ id: 'broadway-red', cat: 'lips', name: 'Broadway Red', line: 'Lips', price: 36, colour: 'Marquee', blurb: 'A billboard red. Own the room.', story: 'Blue-red, fully opaque. Opening night.', notes: ['Opaque', 'Blue red', 'Satin'], specs: ['3.6g', 'NYC', 'Cap', 'Vegan'], sizes: ['Marquee', 'Cherry', 'Scarlet'] }),
  item({ id: 'west-village-rose', cat: 'lips', name: 'West Village Rose', line: 'Lips', price: 32, colour: 'Dusty rose', blurb: 'A dusty rose for brownstones and galleries.', story: 'Muted, expensive, never cute.', notes: ['Dusty', 'Satin', 'MLBB'], specs: ['3.4g', 'NYC', 'Vegan', 'Refill'], sizes: ['Dusty', 'Mauve', 'Tea rose'] }),
  item({ id: 'harlem-berry', cat: 'lips', name: 'Harlem Berry', line: 'Lips', price: 34, colour: 'Plum', blurb: 'A plum that photographs as wealth.', story: 'Deep, warm, American. Not costume.', notes: ['Plum', 'Cream', 'Evening'], specs: ['3.5g', 'NYC', 'Cream', 'Vegan'], sizes: ['Plum', 'Fig', 'Wine'] }),
  item({ id: 'citrus-gloss', cat: 'lips', name: 'Citrus Gloss', line: 'Lips', price: 26, colour: 'Neroli', blurb: 'A wet gloss with a New York citrus.', story: 'Non-sticky. Summer on a fire escape.', notes: ['Gloss', 'Non sticky', 'Sheer'], specs: ['4ml', 'NYC', 'Wand', 'Vegan'], sizes: ['Neroli', 'Clear', 'Peach'] }),
  item({ id: 'brick-stain', cat: 'lips', name: 'Brick Stain', line: 'Lips', price: 28, colour: 'Tribeca brick', blurb: 'A stain that survives humidity and dinner.', story: 'Looks like you bit your lip. On purpose.', notes: ['Stain', 'Buildable', 'Brick'], specs: ['5ml', 'NYC', 'Tint', 'Vegan'], sizes: ['Brick', 'Clay', 'Terracotta'] }),
  item({ id: 'brooklyn-lash', cat: 'eyes', name: 'Brooklyn Lash', line: 'Eyes', price: 28, colour: 'Carbon', blurb: 'Volume mascara. Lashes like a billboard.', story: 'Fat wand. Survives humidity on the L train.', notes: ['Volume', 'Humidity proof', 'Vegan'], specs: ['9ml', 'NYC', 'Tube', 'Cruelty free'], sizes: ['Carbon', 'Brown black'] }),
  item({ id: 'ink-liner', cat: 'eyes', name: 'Ink Liner', line: 'Eyes', price: 24, colour: 'Jet', blurb: 'A felt liner with a city wing.', story: 'Dries in two seconds. Does not crack at 2am.', notes: ['Felt tip', 'Jet', '24h'], specs: ['0.6ml', 'NYC', 'Felt', 'Vegan'], sizes: ['Jet', 'Brown'] }),
  item({ id: 'sunset-palette', cat: 'eyes', name: 'Sunset Palette', line: 'Eyes', price: 62, colour: 'Golden hour', blurb: 'Twelve city golds and taupes.', story: 'Rooftop light in a compact. No cheap glitter.', notes: ['12 shades', 'Gold + taupe', 'Mirror'], specs: ['12x1.2g', 'NYC', 'Mirror', 'Vegan'], sizes: ONE }),
  item({ id: 'smoke-kohl', cat: 'eyes', name: 'Smoke Kohl', line: 'Eyes', price: 22, colour: 'Graphite', blurb: 'A kohl for last call and first coffee.', story: 'Smudge with a finger. Done.', notes: ['Kohl', 'Cream', 'Graphite'], specs: ['1.2g', 'NYC', 'Pencil', 'Vegan'], sizes: ['Graphite', 'Black', 'Bronze'] }),
  item({ id: 'brow-laminate', cat: 'eyes', name: 'Brow Laminate', line: 'Eyes', price: 26, colour: 'Clear / ash', blurb: 'Laminated brows, five minutes, no appointment.', story: 'Gel that holds through humidity.', notes: ['Gel', 'Hold', 'Ash'], specs: ['5ml', 'NYC', 'Spoolie', 'Vegan'], sizes: ['Clear', 'Ash', 'Soft brown'] }),
  item({ id: 'chrome-lid', cat: 'eyes', name: 'Chrome Lid', line: 'Eyes', price: 30, colour: 'Liquid metal', blurb: 'A lid chrome. One finger.', story: 'Copper-silver. Night architecture.', notes: ['Chrome', 'Pot', 'Finger'], specs: ['3g', 'NYC', 'Pot', 'Vegan'], sizes: ['Copper', 'Silver', 'Gold'] }),
  item({ id: 'skin-veil', cat: 'face', name: 'Skin Veil Foundation', line: 'Face', price: 48, colour: '20 shades', blurb: 'Second-skin. Coverage that still looks like you.', story: 'Twenty shades including olive and deep. Live match in SoHo.', notes: ['20 shades', 'Satin', 'SPF 18'], specs: ['30ml', 'Dropper', 'NYC', 'Live match'], sizes: SHADES_FACE }),
  item({ id: 'sunset-chrome', cat: 'face', name: 'Sunset Chrome', line: 'Face', price: 42, colour: 'Copper flash', blurb: 'Molten highlighter. Chrome, not glitter.', story: 'Built for rooftops and bad lighting that still has to look expensive.', notes: ['Molten', 'Copper', 'No glitter'], specs: ['7g', 'Compact', 'Mirror', 'NYC'], sizes: ['Copper', 'Champagne', 'Pearl'] }),
  item({ id: 'flush-blush', cat: 'face', name: 'Flush Blush', line: 'Face', price: 34, colour: 'Taxi pink', blurb: 'A cream blush that looks like a walk uptown.', story: 'Fingers only. Melt, do not stamp.', notes: ['Cream', 'Fingers', 'Pink'], specs: ['6g', 'Pot', 'NYC', 'Vegan'], sizes: ['Taxi pink', 'Apricot', 'Berry'] }),
  item({ id: 'sculpt-bronzer', cat: 'face', name: 'Sculpt Bronzer', line: 'Face', price: 36, colour: 'Warm concrete', blurb: 'A bronzer that sculpts, not oranges.', story: 'American olive to deep. Hollows, not stripes.', notes: ['Sculpt', 'Warm', 'Powder'], specs: ['8g', 'Compact', 'NYC', 'Vegan'], sizes: ['Light warm', 'Medium', 'Deep'] }),
  item({ id: 'blur-powder', cat: 'face', name: 'Blur Powder', line: 'Face', price: 40, colour: 'Translucent', blurb: 'Flash-proof blur for the office and the event.', story: 'No flashback. No cake.', notes: ['Blur', 'Flash proof', 'Travel'], specs: ['9g', 'Compact', 'NYC', 'Refill'], sizes: ['Translucent', 'Light', 'Deep'] }),
  item({ id: 'correct-city', cat: 'face', name: 'City Corrector', line: 'Face', price: 30, colour: 'Peach / olive', blurb: 'Correct then veil. Dark circles, redness, done.', story: 'Peach, olive, lavender. Pot.', notes: ['Correct', 'Cream', 'Pot'], specs: ['4g', 'Pot', 'NYC', 'Vegan'], sizes: ['Peach', 'Olive', 'Lavender'] }),
  item({ id: 'grip-primer', cat: 'skin', name: 'Grip Primer', line: 'Skin', price: 38, colour: 'Clear', blurb: 'Makeup that survives August in New York.', story: 'Grip, blur, four extra hours.', notes: ['Grip', 'Pore blur', 'Clear'], specs: ['30ml', 'Tube', 'NYC', 'Vegan'], sizes: ONE }),
  item({ id: 'set-mist', cat: 'skin', name: 'Set Mist', line: 'Skin', price: 28, colour: 'Cucumber', blurb: 'Locks the face. Smells like a spa, not a lab.', story: 'Fine mist. Bag size.', notes: ['Mist', 'Set', 'Cucumber'], specs: ['100ml', 'Spray', 'NYC', 'Travel'], sizes: ONE }),
  item({ id: 'gel-cleanse', cat: 'skin', name: 'Gel Cleanser', line: 'Skin', price: 32, colour: 'Cucumber', blurb: 'Takes off Broadway Red. Does not strip.', story: 'Gel, not foam. NYC hard water ok.', notes: ['Gel', 'pH 5.5', '150ml'], specs: ['150ml', 'Pump', 'NYC', 'Daily'], sizes: ONE }),
  item({ id: 'peptide-serum', cat: 'skin', name: 'Peptide Serum', line: 'Skin', price: 74, colour: 'Clear', blurb: 'A peptide serum makeup sits on.', story: 'Firm, dew, no pilling under Skin Veil.', notes: ['Peptide', '30ml', 'Dropper'], specs: ['30ml', 'Dropper', 'NYC', 'AM/PM'], sizes: ONE }),
  item({ id: 'night-cream', cat: 'skin', name: 'Night Cream', line: 'Skin', price: 68, colour: 'Rich', blurb: 'Night cream. Morning skin. Winter in New York.', story: 'Ceramides. Not greasy on a pillow.', notes: ['Ceramide', '50ml', 'Rich'], specs: ['50ml', 'Jar', 'NYC', 'PM'], sizes: ONE }),
  item({ id: 'spf-city', cat: 'skin', name: 'City SPF 40', line: 'Skin', price: 36, colour: 'Invisible', blurb: 'A city SPF that does not pill.', story: 'No white cast on olive and deep.', notes: ['SPF 40', 'Invisible', '40ml'], specs: ['40ml', 'Tube', 'NYC', 'AM'], sizes: ONE }),
  item({ id: 'buffer-brush', cat: 'tools', name: 'Buffer Brush', line: 'Tools', price: 42, colour: 'Synthetic', blurb: 'The buffer for Skin Veil.', story: 'Dense, vegan, washable.', notes: ['Dense', 'Vegan', 'Wash'], specs: ['Handle 16cm', 'NYC', 'Synthetic', 'Case'], sizes: ONE }),
  item({ id: 'crease-brush', cat: 'tools', name: 'Crease Brush', line: 'Tools', price: 24, colour: 'Tapered', blurb: 'A crease brush that actually blends.', story: 'Tapered, not fluffy-useless.', notes: ['Taper', 'Eye', 'Vegan'], specs: ['Handle 14cm', 'NYC', 'Synthetic', 'Cap'], sizes: ONE }),
  item({ id: 'ny-pouch', cat: 'tools', name: 'SoHo Makeup Pouch', line: 'Tools', price: 58, colour: 'Black nylon', blurb: 'A pouch that looks like a camera bag.', story: 'Nylon, zip, holds the full face.', notes: ['Nylon', 'Zip', 'Holds 12'], specs: ['22×12cm', 'NYC', 'Water resistant', 'Gift'], sizes: ONE }),
  item({ id: 'steel-compact', cat: 'tools', name: 'Steel Compact', line: 'Tools', price: 48, colour: 'Brushed steel', blurb: 'A compact that is an object.', story: '3x, brushed steel, engraves.', notes: ['Steel', '3x', 'Engrave'], specs: ['7cm', 'NYC', 'Mirror', 'Gift'], sizes: ONE }),
  item({ id: 'lip-brush', cat: 'tools', name: 'Lip Brush', line: 'Tools', price: 18, colour: 'Pointed', blurb: 'A pointed lip brush for Broadway Red.', story: 'Synthetic, cap, washable.', notes: ['Point', 'Cap', 'Vegan'], specs: ['12cm', 'NYC', 'Cap', 'Wash'], sizes: ONE }),
  item({ id: 'full-face-kit', cat: 'kits', name: 'Full Face Kit', line: 'Kits', price: 148, colour: 'Edit 01', blurb: 'Lip, lash, veil, blush, mist. One bag.', story: 'The counter edit the desk actually sells.', notes: ['5 pieces', 'Travel', 'Gift'], specs: ['Kit', 'NYC', 'Pouch', 'Value'], sizes: ['Fair–light', 'Medium', 'Tan–deep'] }),
  item({ id: 'lip-wardrobe', cat: 'kits', name: 'Lip Wardrobe', line: 'Kits', price: 96, colour: 'Four bullets', blurb: 'Nude, rose, brick, red. One pouch.', story: 'Four refills. One steel pouch.', notes: ['4 lipsticks', 'Pouch', 'Refill'], specs: ['Kit', 'NYC', 'Gift', 'Value'], sizes: ONE }),
  item({ id: 'eye-edit', cat: 'kits', name: 'Eye Edit', line: 'Kits', price: 88, colour: 'Night', blurb: 'Palette, liner, lash, kohl.', story: 'The after-dark eye. One tin.', notes: ['4 pieces', 'Night', 'Tin'], specs: ['Kit', 'NYC', 'Tin', 'Gift'], sizes: ONE })
]

export const US = {
  key: 'us',
  kind: 'beauty',
  name: 'Aurelia New York',
  city: 'SoHo, New York',
  phone: '+1 212 555 0194',
  tag: 'American makeup house · lips, eyes, face, skin',
  currency: '$',
  locale: 'en-US',
  path: '/us',
  products: usProducts
}

export const US_CATS = [
  { id: 'lips', label: 'Lips' },
  { id: 'eyes', label: 'Eyes' },
  { id: 'face', label: 'Face' },
  { id: 'skin', label: 'Skin' },
  { id: 'tools', label: 'Tools' },
  { id: 'kits', label: 'Kits' }
]
