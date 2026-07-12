import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { env } from '../config/env';
import { AppError } from './errorHandler';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'transitops/misc';
    if (file.fieldname === 'profileImage') folder = 'transitops/users';
    if (file.fieldname === 'vehicleImage' || file.fieldname === 'vehicleDocuments') folder = 'transitops/vehicles';
    if (file.fieldname === 'driverImage' || file.fieldname === 'driverDocuments') folder = 'transitops/drivers';
    if (file.fieldname === 'invoiceUpload') folder = 'transitops/invoices';

    return {
      folder: folder,
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
      resource_type: 'auto',
    };
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type. Only JPEG, PNG, WEBP and PDF are allowed.', 400));
    }
  },
});
