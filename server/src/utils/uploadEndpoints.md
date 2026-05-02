# Image Upload Endpoints

## Hero Image Upload

**POST** `/api/upload/hero`

- Content-Type: `multipart/form-data`
- Field name: `heroImage`
- Accepts: Single image file
- Max size: 5MB
- Supported formats: All image types (jpg, png, gif, etc.)

**Response:**

```json
{
  "message": "Hero image uploaded successfully",
  "url": "/uploads/heroImage-1234567890-123456789.jpg",
  "filename": "heroImage-1234567890-123456789.jpg"
}
```

## Gallery Images Upload

**POST** `/api/upload/gallery`

- Content-Type: `multipart/form-data`
- Field name: `galleryImages`
- Accepts: Multiple image files (max 10)
- Max size per file: 5MB
- Supported formats: All image types (jpg, png, gif, etc.)

**Response:**

```json
{
  "message": "Gallery images uploaded successfully",
  "files": [
    {
      "url": "/uploads/galleryImages-1234567890-123456789.jpg",
      "filename": "galleryImages-1234567890-123456789.jpg"
    },
    {
      "url": "/uploads/galleryImages-1234567890-987654321.jpg",
      "filename": "galleryImages-1234567890-987654321.jpg"
    }
  ]
}
```

## Static File Access

Uploaded files are served at: `http://localhost:5000/uploads/{filename}`

## Usage Flow

1. Upload images using the upload endpoints
2. Use the returned URLs in your GraphQL mutations
3. Files are automatically deleted when businesses are updated or deleted
