# Location page image prompts (Google Stitch / Gemini)

The location page shows 5 nearby places with **temporary** AI photos. Some of them have problems: the old "Vega Circle" photo had "COSMOS PRASHIL" signs on a mall, and the City Centre photo shows shop logos (Zara, H&M, Adidas) that may not be in that mall. Make new ones with the prompts below.

**Real photos are better.** These are real places that buyers will visit, so an AI image that doesn't look like the real place can hurt trust. SGMG built **Vega Circle Mall** and **Cosmos Mall**, so ask SGMG's marketing team for real photos of those two first. Use AI images only where you can't get a real photo.

**Status (2026-10-06)**: LOC-01, LOC-03 and LOC-04 are made and on the site. Savin Kingdom (LOC-04) has replaced Vega Circle in the hero slides, so **LOC-02 (Vega Circle) and LOC-05 (Hong Kong Market) are now only needed for the small cards**; the site shows the old AI images for those two until then.

**How to use**
1. Paste each prompt into Google Stitch, one prompt per screen. Each prompt starts with a code such as `LOC-01`, which tells Claude where the image goes.
2. When all 5 are done, download them all (a zip is fine) and give Claude the file or folder location.
3. Claude matches each image by its code, compresses it, makes the small card version, and puts it on the site.

**Layout rules already built into the prompts**
- On desktop, the place name and description sit in the **top-left**, the travel times at the **bottom-left**, and small slide thumbnails at the **bottom centre**. So the top-left is kept as open sky and the bottom as plain ground.
- On phones, the page shows only the **middle third** of the image, so the main building is kept in the centre.
- **No readable signs, shop names or brand logos**, so the image never claims a shop or name that isn't really there.

---

## Hero slides (big full-screen photos, also used for the small cards)

**LOC-01**: City Centre, Matigara
File: `public/assets/locations/city-centre.jpg` (+ `thumbs/city-centre.jpg`)
```
LOC-01 City Centre: Photorealistic photograph, 16:9 landscape. A large modern shopping mall in Siliguri, West Bengal, India, at golden hour just after sunset, with warm lights glowing from the shopfronts. Several storeys of glass and cream stone wrap around a wide open-air central plaza with paved walkways, palm trees, low hedges, benches and lamp posts. A few shoppers walk across the plaza, small in the frame, natural and not posed. Warm orange and soft blue sky. Composition: the mall building is centred in the middle third of the frame, the upper-left quarter is open sky, and the bottom edge is plain paved plaza. No text, no readable signs or shop names, no brand logos, no watermark. Ultra-realistic, sharp focus, high detail, natural light and shadows, professional architecture photography, full-frame camera, wide-angle lens. Output one single full-screen photograph only: no UI, no frame, no text, no split or collage layout.
```

**LOC-02**: Vega Circle Mall, Sevoke Road
File: `public/assets/locations/vega-circle-mall.jpg` (+ `thumbs/vega-circle-mall.jpg`)
```
LOC-02 Vega Circle Mall: Photorealistic photograph, 16:9 landscape. A modern multi-storey shopping mall beside a busy main road in Siliguri, West Bengal, India, on a bright late afternoon. Clean glass and light-grey facade, a wide entrance with steps and a canopy, a green strip of palm trees and shrubs in front, and a few auto-rickshaws, scooters and cars passing on the road with slight motion blur. Clear blue sky with a few soft clouds and the faint green Himalayan foothills far behind. A few shoppers near the entrance, small in the frame, natural and not posed. Composition: the mall building is centred in the middle third of the frame, the upper-left quarter is open sky, and the bottom edge is plain road. No text, no readable signs or shop names, no brand logos, no watermark. Ultra-realistic, sharp focus, high detail, natural light and shadows, professional architecture photography, full-frame camera, wide-angle lens. Output one single full-screen photograph only: no UI, no frame, no text, no split or collage layout.
```

**LOC-03**: Cosmos Mall, Sevoke Road
File: `public/assets/locations/cosmos-mall.jpg` (+ `thumbs/cosmos-mall.jpg`)
```
LOC-03 Cosmos Mall: Photorealistic photograph, 16:9 landscape. A modern shopping mall on a main city road in Siliguri, West Bengal, India, at blue hour in the evening. A tall glass atrium glowing with warm interior light, several lit floors of shops, a forecourt with planters and street lamps, and light trails from traffic on the road in front. Deep blue sky. A few people at the entrance, small in the frame, natural and not posed. Composition: the mall building is centred in the middle third of the frame, the upper-left quarter is open sky, and the bottom edge is plain road. No text, no readable signs or shop names, no brand logos, no watermark. Ultra-realistic, sharp focus, high detail, natural light and shadows, professional architecture photography, full-frame camera, wide-angle lens. Output one single full-screen photograph only: no UI, no frame, no text, no split or collage layout.
```

---

## Card photos only (small, about 56–66 px wide on the page)

These two only appear as small squares on the place cards, so keep the shapes bold and simple.

**LOC-04**: Savin Kingdom
File: `thumbs/savin-kingdom.jpg` (+ `savin-kingdom.jpg`)
```
LOC-04 Savin Kingdom: Photorealistic photograph, 16:9 landscape. A family amusement and water park in Siliguri, West Bengal, India, on a bright sunny day. A colourful fairy-tale castle-style entrance with turrets in the centre, curving blue and yellow water slides behind it, a Ferris wheel on one side, tall green trees and lawns. A few families walking, small in the frame, natural and not posed. Clear blue sky. Composition: the castle entrance is centred, with bold simple shapes that still read when the photo is shown very small. No text, no readable signs, no brand logos, no watermark. Ultra-realistic, sharp focus, high detail, natural light and shadows, professional travel photography, full-frame camera, wide-angle lens. Output one single full-screen photograph only: no UI, no frame, no text, no split or collage layout.
```

**LOC-05**: Hong Kong Market
File: `thumbs/hong-kong-market.jpg` (+ `hong-kong-market.jpg`)
```
LOC-05 Hong Kong Market: Photorealistic photograph, 16:9 landscape. A busy covered street market in Siliguri, West Bengal, India, in the late afternoon. A narrow lane lined with small shops and stalls selling clothes, shoes, bags and electronics, colourful garments hanging on display, warm string lights overhead, and shoppers walking through the lane. Lively, warm atmosphere. Composition: the lane runs straight away from the camera through the centre of the frame, with bold colours that still read when the photo is shown very small. No text, no readable signs or shop names, no brand logos, no watermark. Ultra-realistic, sharp focus, high detail, natural light and shadows, professional street photography, full-frame camera, wide-angle lens. Output one single full-screen photograph only: no UI, no frame, no text, no split or collage layout.
```

---

The places in the Getting around, Schools and Healthcare tabs use icons instead of photos, so they need no images.
