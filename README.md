# AK Realty and Construction Website

Professional website for AK Realty and Construction, featuring Md Habibul Islam (Kazal) and Tareq Aziz (Nirob).

## Features

- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Background Video Cycling**: Automatically cycles through construction/realty videos
- **Modern UI**: Clean, professional design with smooth animations
- **Quote Request Form**: Interactive form for customer inquiries
- **Contact Information**: Direct phone links and business details
- **Service Listings**: Comprehensive list of construction and real estate services
- **Team Profiles**: Information about both licensed professionals

## File Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All CSS styles and responsive design
├── js/
│   └── script.js       # JavaScript functionality
├── assets/
│   ├── images/
│   │   └── md-profile.jpg    # Profile image for Md Habibul Islam
│   └── videos/               # Background videos
│       ├── kitchen.mp4
│       ├── kitchen-2.mp4
│       ├── livingroom.mp4
│       └── bathroom.mp4
└── docs/
    └── design.md       # Original design document
```

## Color Scheme

- **Light**: #F1EFEC (Background)
- **Beige**: #D4C9BE (Accents)
- **Blue**: #123458 (Primary brand color)
- **Dark**: #030303 (Text)

## Key Features Explained

### 1. Background Video Cycling
- Automatically plays videos in sequence
- Smooth transitions between videos
- Fallback handling for loading issues

### 2. Navigation
- Fixed header with smooth scrolling
- Mobile-responsive hamburger menu
- Auto-hide header on scroll down

### 3. Quote Form
- Form validation for all required fields
- Email and phone number validation
- Generates mailto link for easy contact

### 4. Responsive Design
- Optimized for mobile, tablet, and desktop
- Flexible grid layouts
- Touch-friendly interface

## Customization

### Adding New Videos
1. Add video files to `assets/videos/` directory
2. Update the `videos` array in `js/script.js`

### Updating Contact Information
- Phone numbers: Update in HTML and JavaScript
- Business hours: Update in the contact section
- Service areas: Update in the contact section

### Adding Services
- Update the services section in `index.html`
- Services are organized in three categories for easy browsing

### Updating Team Information
- Add Tareq's photo: Replace placeholder with actual image
- Update profile information in the about section

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Features

- Optimized video loading
- Lazy loading for images
- Efficient CSS animations
- Minimal JavaScript footprint

## SEO Optimized

- Semantic HTML structure
- Meta descriptions and titles
- Alt text for images
- Clean URL structure

## Getting Started

1. Upload all files to your web server
2. Ensure video files are properly uploaded
3. Test the contact form functionality
4. Verify all links and phone numbers work correctly

## Notes

- The quote form currently uses a mailto link. For production, you may want to integrate with a backend service or email service
- Videos should be optimized for web (compressed) to ensure fast loading
- Consider adding analytics tracking code if needed
- The website is ready for SSL certificate installation

## Support

For technical support or modifications, contact your web developer or refer to the code comments in each file. 