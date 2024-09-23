import Replicate from "replicate";
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ message: 'Error parsing form data', error: err.message });
      }

      try {
        console.log('Fields:', fields);
        console.log('Files:', Object.keys(files));

        const garm_img = files.garm_img?.[0] || files.garm_img;
        const human_img = files.human_img?.[0] || files.human_img;
        const { garment_des, replicate_token, category } = fields;

        if (!garm_img || !human_img || !garment_des || !category) {
          console.error('Missing fields:', { garm_img: !!garm_img, human_img: !!human_img, garment_des: !!garment_des, category: !!category });
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const replicate = new Replicate({
          auth: replicate_token,
        });

        console.log('Reading files...');
        const garmImgBuffer = fs.readFileSync(garm_img.filepath);
        const humanImgBuffer = fs.readFileSync(human_img.filepath);

        const garmImgBase64 = garmImgBuffer.toString('base64');
        const humanImgBase64 = humanImgBuffer.toString('base64');

        console.log('Calling Replicate API...');
        const output = await replicate.run(
          "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
          {
            input: {
              garm_img: `data:${garm_img.mimetype};base64,${garmImgBase64}`,
              human_img: `data:${human_img.mimetype};base64,${humanImgBase64}`,
              garment_des: garment_des[0] || garment_des,
              category: category[0] || category,
              crop: false,
              seed: 42,
              steps: 30,
              force_dc: false,
              mask_only: false,
            },
          }
        );

        console.log('Replicate API response:', output);
        res.status(200).json({ result: output });
      } catch (error) {
        console.error('Error in try-on process:', error);
        res.status(500).json({ message: 'Error processing try-on request', error: error.message });
      } finally {
        // Clean up temporary files
        if (files.garm_img) fs.unlinkSync(files.garm_img[0]?.filepath || files.garm_img.filepath);
        if (files.human_img) fs.unlinkSync(files.human_img[0]?.filepath || files.human_img.filepath);
      }
    });
  } catch (error) {
    console.error('Unexpected error in API route:', error);
    res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
  }
}