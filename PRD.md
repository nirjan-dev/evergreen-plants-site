# Product Requirements Document (PRD)
## Evergreen Plant Nursery eCommerce Website

### 1. Project Overview

**Business Name:** Evergreen Plant Nursery  
**Project Goal:** Create a simple eCommerce website to reduce manual customer support and streamline plant sales for a nursery business in Nepal  
**Target Audience:** Older Nepali people who discover the business through TikTok  

### 2. Business Requirements

#### 2.1 Current Pain Points
- High volume of repetitive questions via TikTok DMs about:
  - Plant availability
  - Pricing information
  - Delivery costs and areas
  - General plant care information
- Manual order processing through social media
- Paper-based inventory tracking

#### 2.2 Business Goals
- Reduce manual customer support workload
- Provide self-service information for customers
- Streamline order processing
- Professional online presence
- Scale to 5-30 orders per week

### 3. Technical Requirements

#### 3.1 Core Features (MVP)
- **Bilingual Support:** English and Nepali with language toggle
- **Product Catalog:** 10-30 plants with basic information
- **Inventory Management:** Real-time stock display
- **Location-based Delivery Pricing:** Based on distance from Jhapa and product weight
- **Mobile-first Responsive Design:** Optimized for older users
- **Simple Admin Dashboard:** For non-technical business owner

#### 3.2 Product Information Structure
Each plant product should include:
- Plant name (English/Nepali)
- Price (NPR)
- Current stock quantity
- Product images
- Basic care instructions (optional)
- Product weight (for delivery calculation) (optional for now)
- Description (optional)

#### 3.3 Payment & Order Management
- **Payment Methods:**
  - Manual online payments (bank transfer, eSewa, Fonepay QR)
  - Image upload for payment proof
- **Order Workflow:**
  1. Customer places order
  2. Customer makes payment and uploads proof
  3. Admin marks order as paid/verified
  4. Order processing and delivery coordination
- **Future methods**
 - esewa integration
 - bank payment integration
#### 3.4 Delivery Management
- Delivery zones within Nepal
- Pricing based on:
  - Distance from Jhapa
  - Total order weight
- Display delivery cost before checkout
- Integration with local delivery partners

### 4. User Experience Requirements

#### 4.1 Target User Considerations
- **Older Nepali Users:** Simple, clear interface with larger fonts
- **Mobile-first:** Primary access through mobile devices
- **Low Technical Literacy:** Minimal steps, clear instructions
- **Cultural Sensitivity:** Appropriate for Nepali market

#### 4.2 User Flows

**Customer Journey:**
1. Land on homepage (language selection)
2. Browse available plants
3. View plant details and care instructions
4. Check delivery availability for their area
5. Add items to cart
6. View delivery cost
7. Place order with contact information
8. Make payment and upload proof
9. Receive order confirmation

**Admin Workflow:**
1. Login to admin dashboard
2. Manage plant inventory (add/edit/stock levels)
3. View new orders
4. Verify payment proof
5. Mark orders as paid/processing
6. Update delivery zones and pricing

### 5. Technical Specifications

#### 5.1 Hosting & Infrastructure
- **Platform:** Fly.io
- **Scaling:** Auto-scaling with scale-to-zero for cost management
- **Performance:** Fast loading for mobile users in Nepal
 
#### 5.2 Admin Interface Requirements
- Simple, intuitive design for non-technical user
- Basic product management (CRUD operations)
- Order management dashboard
- Payment verification interface
- Inventory tracking

#### 5.3 Internationalization
- English/Nepali language support
- Language toggle functionality
- Currency in NPR (Nepalese Rupees)
- Cultural considerations for older users

#### 5.4 Tech stack
- Nuxt 4 for fullstack framework using node.js 24 (with typescript)
- Vue.js 3 frontend framework
- Nuxt UI as the UI framework and TailwindCSS for styling
- Nuxt Content with Nuxt Studio (alpha) for content management
- Key Nuxt modules used: nuxt content, nuxt eslint, nuxt hints, nuxt scripts, nuxt test-utils, nuxt image and nuxt vue
- Eslint for linting (pnpm lint and pnpm lint:fix for checks)
- vue-tsc for typechecking (pnpm typecheck for type checking)
- Fly.io for hosting and deployment as a SSR nuxt 4 app.


### 6. Content Requirements

#### 6.1 Static Content Needed
- Homepage content (English/Nepali)
- FAQ section covering:
  - Delivery areas and costs
  - Payment methods
  - Plant care instructions
  - Order process
  - Contact information
- About page (business information)

#### 6.2 Branding
- **Business Name:** Evergreen Plant Nursery
- **Logo:** Dark shade of green (existing)
- **Color Scheme:** Green-based, natural tones
- **Tone:** Friendly, trustworthy, simple

### 7. Success Metrics

#### 7.1 Short-term Goals (1-3 months)
- Reduce TikTok DM inquiries by 50%
- Process 5-30 orders per week through website
- 80% of users able to complete purchase without assistance

#### 7.2 Long-term Goals (6+ months)
- Integrate automated payment gateways (eSewa, etc.)
- Advanced inventory management
- Customer accounts and order history
- Analytics and reporting

### 8. Constraints & Limitations

#### 8.1 Technical Constraints
- Minimal hosting budget
- No complex payment gateway integration initially
- Basic inventory management

#### 8.2 Market Constraints
- Limited payment options in Nepal
- Target audience has low technical literacy
- Mobile-primary market
- Localization requirements

### 9. Future Enhancements (Post-MVP)

#### 9.1 Phase 2 Features
- Automated payment gateway integration
- Customer account system
- Advanced inventory management
- Email notifications
- Analytics dashboard

#### 9.2 Phase 3 Features
- Plant care reminders
- Seasonal product recommendations
- Customer reviews and ratings
- Social media integration

### 10. Risk Assessment

#### 10.1 Technical Risks
- Payment verification workflow complexity
- Language localization challenges
- Mobile performance in Nepal's internet conditions

#### 10.2 Business Risks
- User adoption by older demographic
- Competition from social media sales
- Delivery logistics coordination

### 11. Definition of Done (MVP)

The MVP will be considered complete when:
- [] Responsive website deployed on Fly.io
- [] Bilingual support (English/Nepali) with toggle
- [] Product catalog with 10+ plants
- [] Delivery cost calculator by location
- [] Manual payment workflow with image upload
- [] Simple admin dashboard for order/inventory management
- [] FAQ section with common questions answered
- [] Mobile-optimized for older users
- [] Order management system for business owner
