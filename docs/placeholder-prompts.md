# Vision prompts for the empty homepage slots

Mood images for showing Zheen the vision for every empty slot on the homepage. Each one shows the kind of real photo
or video she should later pick from her own work to replace it. Paste each prompt into the image model as one block.

| # | Slot | Ratio | Zheen replaces it with |
| --- | --- | --- | --- |
| 1 | Meet Zheen portrait | 4:5 | R01, her own studio portrait |
| 2a / 2b | Slider: Lip Neutralization (default view) | 16:10 | R12, a real neutralization before and healed pair |
| 3a / 3b | Slider: Lip Blush | 16:10 | R11 pair |
| 4a / 4b | Slider: Lip Ombré | 16:10 | R13 pair |
| 5a / 5b | Slider: Skin (scar camouflage) | 16:10 | R18 to R20 pair |
| 6 | Reel 1: Consultation and colour matching | 3:4 | R23 reel |
| 7 | Reel 2: Pigment preparation | 3:4 | R24 reel |
| 8 | Reel 3: The treatment, up close | 3:4 | R25 reel |
| 9 | Reel 4: Healed result walkthrough | 3:4 | R30 reel |

**How to make the slider pairs line up:** generate the "before" (a) first. Then, in the same chat, attach that image
and run the "healed" (b) prompt. The model keeps the same face, crop and light and changes only the lips or skin, so
the two halves match when the slider handle moves.

---

## 1. Meet Zheen portrait (4:5)

```
Photorealistic editorial portrait for BLUSH BEAUTY BY ZEE, a lip artistry and skin camouflage studio in Orléans, Ottawa. Warm palette: alabaster #F4EDE7, muted blush #EBC8CE, dusty rose #B86E85, oxblood #552739, ink #24191E, small antique champagne-gold accents. Real skin texture, no airbrushing, no text or logos.

SUBJECT: A woman in her early thirties, a permanent makeup artist, with long dark wavy hair, warm olive-tan skin and soft natural makeup with rosy-nude lips. She wears a fitted cream knit top and stands at ease in her small, elegant studio, one hand resting on the back of a cream treatment chair, smiling warmly and directly at the camera. Behind her: a pale limestone wall, a round mirror with a thin gold frame, a tray of pigment bottles and soft window light from the right.
COMPOSITION: Vertical 4:5, waist-up, subject slightly left of centre, with soft, out-of-focus studio space on the right. Eye-level, 85mm lens feel, shallow depth of field.
DELIVERABLE: 4:5 portrait, photorealistic, no words.
```

## 2a. Lip Neutralization, before (16:10)

```
Photorealistic close-up beauty documentation photo for a lip artistry studio. Clean, honest, consistent lighting like a professional before-and-after record: soft even frontal softbox light, neutral white balance, plain warm-grey background, real skin texture, no makeup on the lips, no retouching, no text.

SUBJECT: The lower face of a woman with deep brown skin (Fitzpatrick V), from just below the eyes to the chin, lips relaxed and gently closed. Her natural lips are darker and uneven in tone: a deep cocoa-brown outer border, patchy darker areas toward the corners, and a lighter, slightly purplish centre. Natural lip lines and texture are visible.
COMPOSITION: Landscape 16:10, lips centred horizontally and slightly above centre, the face filling the frame width, straight-on camera at lip height. Keep the framing simple and repeatable because a matching second image will be made from it.
DELIVERABLE: 16:10 landscape, photorealistic, no words.
```

## 2b. Lip Neutralization, healed (16:10)

Attach image 2a first.

```
Use the attached image as the exact reference. Keep the same woman, face, skin, pose, crop, camera angle, background and lighting, pixel-aligned. Change only the lips.

Show the same lips fully healed after a lip neutralization treatment: the dark, uneven border and patchy corners are now an even, soft warm rose-nude tone that blends naturally into her deep brown skin, with a softly defined lip line. The colour looks natural and healed, with a subtle satin finish rather than glossy lipstick, and the natural lip lines and texture are still visible. The result should look like believable healed cosmetic tattooing, not makeup.

DELIVERABLE: 16:10 landscape, photorealistic, no words.
```

## 3a. Lip Blush, before (16:10)

```
Photorealistic close-up beauty documentation photo for a lip artistry studio. Soft even frontal softbox light, neutral white balance, plain warm-grey background, real skin texture, no makeup on the lips, no retouching, no text.

SUBJECT: The lower face of a woman with light-medium warm skin, from just below the eyes to the chin, lips relaxed and gently closed. Her natural lips are pale and slightly washed out, with a blurred, faint lip border and uneven pink-beige colour.
COMPOSITION: Landscape 16:10, lips centred and slightly above centre, straight-on camera at lip height. Keep the framing simple and repeatable because a matching second image will be made from it.
DELIVERABLE: 16:10 landscape, photorealistic, no words.
```

## 3b. Lip Blush, healed (16:10)

Attach image 3a first.

```
Use the attached image as the exact reference. Keep the same woman, face, skin, pose, crop, camera angle, background and lighting, pixel-aligned. Change only the lips.

Show the same lips fully healed after a lip blush treatment: a soft, even, natural rosy-pink colour across the whole lip, a gently defined border that slightly improves symmetry, and a fresh "my lips but better" look. Subtle satin finish, natural lip lines still visible, no gloss and no lipstick look.

DELIVERABLE: 16:10 landscape, photorealistic, no words.
```

## 4a. Lip Ombré, before (16:10)

```
Photorealistic close-up beauty documentation photo for a lip artistry studio. Soft even frontal softbox light, neutral white balance, plain warm-grey background, real skin texture, no makeup on the lips, no retouching, no text.

SUBJECT: The lower face of a woman with medium tan skin (Fitzpatrick IV), from just below the eyes to the chin, lips relaxed and gently closed. Her natural lips are a muted mauve-beige with a soft, slightly undefined border.
COMPOSITION: Landscape 16:10, lips centred and slightly above centre, straight-on camera at lip height. Keep the framing simple and repeatable because a matching second image will be made from it.
DELIVERABLE: 16:10 landscape, photorealistic, no words.
```

## 4b. Lip Ombré, healed (16:10)

Attach image 4a first.

```
Use the attached image as the exact reference. Keep the same woman, face, skin, pose, crop, camera angle, background and lighting, pixel-aligned. Change only the lips.

Show the same lips fully healed after a lip ombré treatment: a graduated colour, deeper berry-rose along the outer border, fading smoothly to a lighter soft rose toward the centre of the lips, giving dimension and definition. Satin healed finish, natural lip lines still visible, no gloss and no lipstick look.

DELIVERABLE: 16:10 landscape, photorealistic, no words.
```

## 5a. Skin, scar camouflage, before (16:10)

```
Photorealistic clinical-editorial documentation photo for a skin camouflage studio. Soft even light, neutral white balance, plain warm-grey background, real skin texture, no retouching, no text, respectful and non-sexualised.

SUBJECT: Close-up of the outer upper arm and shoulder of a woman with medium-deep brown skin. A mature, fully healed linear surgical scar about 8 cm long runs diagonally across the skin. The scar is flat and noticeably lighter than the surrounding skin (hypopigmented), pale beige-pink against her brown skin.
COMPOSITION: Landscape 16:10, scar centred running lower-left to upper-right, straight-on camera. Keep the framing simple and repeatable because a matching second image will be made from it.
DELIVERABLE: 16:10 landscape, photorealistic, no words.
```

## 5b. Skin, scar camouflage, healed (16:10)

Attach image 5a first.

```
Use the attached image as the exact reference. Keep the same arm, skin, crop, camera angle, background and lighting, pixel-aligned. Change only the scar.

Show the same scar fully healed after scar camouflage tattooing: the pale scar has been colour-matched to her brown skin, so it now blends in closely and is much less noticeable. The faint line and subtle texture are still just visible on close inspection, as a realistic camouflage result, not a scar that has disappeared.

DELIVERABLE: 16:10 landscape, photorealistic, no words.
```

## 6. Reel 1: Consultation and colour matching (3:4)

```
Photorealistic cinematic still from a beauty studio Instagram reel for BLUSH BEAUTY BY ZEE. Warm palette: alabaster, muted blush, dusty rose, oxblood, small champagne-gold accents. Soft window light, real skin texture, no text or logos.

SUBJECT: A permanent makeup artist with long dark wavy hair, in a cream top and blush-pink nitrile gloves, holds a fan of small lip-colour swatches up beside the lips of a seated client with deep brown skin, comparing shades. The client looks into a round handheld mirror and smiles. A blank colour worksheet and pigment bottles sit on the limestone counter.
COMPOSITION: Vertical 3:4, both faces in the middle third, with slightly darker, calmer areas at the top and bottom for a play button and caption.
DELIVERABLE: 3:4 portrait, photorealistic, no words.
```

## 7. Reel 2: Pigment preparation (3:4)

```
Photorealistic cinematic still from a beauty studio Instagram reel for BLUSH BEAUTY BY ZEE. Warm palette: alabaster, muted blush, dusty rose, oxblood, small champagne-gold accents. Subdued studio light with deep soft shadows, no text or logos.

SUBJECT: Close-up of an artist's hands in blush-pink nitrile gloves mixing two lip pigments, a warm peach and a rose, in a small clear ring cup with a fine applicator. Beside them on a clean tray: a sealed single-use needle cartridge, a slim rose-gold permanent makeup pen and three small unlabeled pigment bottles.
COMPOSITION: Vertical 3:4, hands and cup centred, background falling into oxblood shadow, darker bands at top and bottom for a play button and caption.
DELIVERABLE: 3:4 portrait, photorealistic, no words.
```

## 8. Reel 3: The treatment, up close (3:4)

```
Photorealistic cinematic still from a beauty studio Instagram reel for BLUSH BEAUTY BY ZEE. Warm palette: alabaster, muted blush, dusty rose, oxblood, small champagne-gold accents. Clean, professional, hygienic; soft focused key light, no text or logos.

SUBJECT: Extreme close-up of a lip blush treatment in progress. A client lies relaxed with eyes closed; only her lower face is in frame. The artist's gloved hand gently stretches the skin beside the mouth while the other holds a slim rose-gold permanent makeup pen with its tip lightly touching the lip border. A soft rose pigment is being applied, with a clean, precise lip line. No blood, no swelling, calm and careful.
COMPOSITION: Vertical 3:4, lips and pen tip at the centre, shallow depth of field, darker bands at top and bottom for a play button and caption.
DELIVERABLE: 3:4 portrait, photorealistic, no words.
```

## 9. Reel 4: Healed result walkthrough (3:4)

```
Photorealistic cinematic still from a beauty studio Instagram reel for BLUSH BEAUTY BY ZEE. Warm palette: alabaster, muted blush, dusty rose, oxblood, small champagne-gold accents. Warm natural daylight, real skin texture, no text or logos.

SUBJECT: A happy client with deep brown skin, in a simple cream top, turns her face slightly toward window light and smiles softly to show her fully healed lips: an even, natural warm rose-nude colour with a soft, defined border and a satin finish. She is lightly touching her chin with one hand, relaxed and confident.
COMPOSITION: Vertical 3:4, face in the middle third, lips clearly visible, slightly darker areas at the top and bottom for a play button and caption.
DELIVERABLE: 3:4 portrait, photorealistic, no words.
```
