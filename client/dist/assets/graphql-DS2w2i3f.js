import{A as d}from"./index-C2jBjY7d.js";const s=`${d}/graphql`,l={getBusinesses:async(n=1,o=9)=>{const e=`
      query GetBusinesses($page: Int, $limit: Int) {
        getBusinesses(page: $page, limit: $limit) {
          businesses {
            id
            name
            location
            category
            priceCategory
            phone
            email
            latitude
            longitude
            heroImageUrl
            galleryImages
            description
            faq {
              question
              answer
            }
            averageRating
            totalRatings
            isOpen
            openingTime
            closingTime
            ratings {
              userId
              rating
              comment
              createdAt
            }
            createdAt
            updatedAt
          }
          totalPages
          currentPage
          totalBusinesses
          hasNextPage
          hasPrevPage
        }
      }
    `;try{const r=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:e,variables:{page:n,limit:o}})})).json();if(r.errors?.length)throw new Error(r.errors[0].message||"GraphQL error");if(!r.data||!r.data.getBusinesses)throw new Error("Invalid response from server (getBusinesses)");return r.data.getBusinesses}catch(t){throw console.error("Error fetching businesses:",t),new Error("Failed to fetch businesses")}},getBusiness:async n=>{const o=`
      query GetBusiness($id: ID!) {
        getBusiness(id: $id) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          isOpen
          openingTime
          closingTime
          publicViews
          ratings {
            userId
            rating
            comment
            createdAt
          }
          createdAt
          updatedAt
        }
      }
    `;try{const t=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:o,variables:{id:n}})})).json();if(t.errors)throw new Error(t.errors[0].message);return t.data.getBusiness}catch(e){throw console.error("Error fetching business:",e),new Error("Failed to fetch business")}},incrementPublicView:async(n,o)=>{const r=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
      mutation IncrementPublicView($businessId: ID!, $date: String) {
        incrementPublicView(businessId: $businessId, date: $date) {
          id
          publicViews
        }
      }
    `,variables:{businessId:n,date:o}})})).json();if(r.errors)throw new Error(r.errors[0].message);return r.data.incrementPublicView},createBusiness:async n=>{const o=`
      mutation CreateBusiness(
        $name: String!
        $location: String!
        $category: String
        $priceCategory: String!
        $phone: String!
        $email: String!
        $latitude: Float!
        $longitude: Float!
        $heroImage: String
        $galleryImages: [String!]
        $description: String!
        $faq: [FAQInput!]
        $isOpen: Boolean
        $openingTime: String
        $closingTime: String
      ) {
        createBusiness(
          name: $name
          location: $location
          category: $category
          priceCategory: $priceCategory
          phone: $phone
          email: $email
          latitude: $latitude
          longitude: $longitude
          heroImage: $heroImage
          galleryImages: $galleryImages
          description: $description
          faq: $faq
          isOpen: $isOpen
          openingTime: $openingTime
          closingTime: $closingTime
        ) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          isOpen
          openingTime
          closingTime
          createdAt
          updatedAt
        }
      }
    `;try{const t=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:o,variables:n})})).json();if(t.errors)throw new Error(t.errors[0].message);return t.data.createBusiness}catch(e){throw console.error("Error creating business:",e),new Error("Failed to create business")}},updateBusiness:async(n,o)=>{const e=`
      mutation UpdateBusiness(
        $id: ID!
        $name: String
        $location: String
        $category: String
        $priceCategory: String
        $phone: String
        $email: String
        $latitude: Float
        $longitude: Float
        $heroImage: String
        $galleryImages: [String!]
        $description: String
        $faq: [FAQInput!]
        $isOpen: Boolean
        $openingTime: String
        $closingTime: String
      ) {
        updateBusiness(
          id: $id
          name: $name
          location: $location
          category: $category
          priceCategory: $priceCategory
          phone: $phone
          email: $email
          latitude: $latitude
          longitude: $longitude
          heroImage: $heroImage
          galleryImages: $galleryImages
          description: $description
          faq: $faq
          isOpen: $isOpen
          openingTime: $openingTime
          closingTime: $closingTime
        ) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          isOpen
          openingTime
          closingTime
          createdAt
          updatedAt
        }
      }
    `;try{const r=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:e,variables:{id:n,...o}})})).json();if(r.errors)throw new Error(r.errors[0].message);return r.data.updateBusiness}catch(t){throw console.error("Error updating business:",t),new Error("Failed to update business")}},deleteBusiness:async n=>{const o=`
      mutation DeleteBusiness($id: ID!) {
        deleteBusiness(id: $id)
      }
    `;try{const t=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:o,variables:{id:n}})})).json();if(t.errors)throw new Error(t.errors[0].message);return t.data.deleteBusiness}catch(e){throw console.error("Error deleting business:",e),new Error("Failed to delete business")}},addFAQ:async(n,o,e)=>{const t=`
      mutation AddFAQ($businessId: ID!, $question: String!, $answer: String!) {
        addFAQ(businessId: $businessId, question: $question, answer: $answer) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          createdAt
          updatedAt
        }
      }
    `;try{const a=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:t,variables:{businessId:n,question:o,answer:e}})})).json();if(a.errors)throw new Error(a.errors[0].message);return a.data.addFAQ}catch(r){throw console.error("Error adding FAQ:",r),new Error("Failed to add FAQ")}},updateFAQ:async(n,o,e,t)=>{const r=`
      mutation UpdateFAQ($businessId: ID!, $faqIndex: Int!, $question: String!, $answer: String!) {
        updateFAQ(businessId: $businessId, faqIndex: $faqIndex, question: $question, answer: $answer) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          createdAt
          updatedAt
        }
      }
    `;try{const i=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:r,variables:{businessId:n,faqIndex:o,question:e,answer:t}})})).json();if(i.errors)throw new Error(i.errors[0].message);return i.data.updateFAQ}catch(a){throw console.error("Error updating FAQ:",a),new Error("Failed to update FAQ")}},deleteFAQ:async(n,o)=>{const e=`
      mutation DeleteFAQ($businessId: ID!, $faqIndex: Int!) {
        deleteFAQ(businessId: $businessId, faqIndex: $faqIndex) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          createdAt
          updatedAt
        }
      }
    `;try{const r=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:e,variables:{businessId:n,faqIndex:o}})})).json();if(r.errors)throw new Error(r.errors[0].message);return r.data.deleteFAQ}catch(t){throw console.error("Error deleting FAQ:",t),new Error("Failed to delete FAQ")}},createAdmin:async n=>{const o=`
      mutation CreateAdmin($name: String!, $email: String!, $password: String!, $businessId: String) {
        createAdmin(name: $name, email: $email, password: $password, businessId: $businessId) {
          id
          name
          email
          role
          businessId
        }
      }
    `;try{const e=localStorage.getItem("token");if(!e)throw new Error("Authentication required");const r=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:o,variables:n})})).json();if(r.errors)throw new Error(r.errors[0].message);return r.data.createAdmin}catch(e){throw console.error("Error creating admin:",e),new Error("Failed to create admin")}},getUsers:async()=>{const n=`
      query GetUsers {
        getUsers {
          id
          name
          email
          role
          businessId
        }
      }
    `;try{const o=localStorage.getItem("token");if(!o)throw new Error("Authentication required");const t=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:n})})).json();if(t.errors)throw new Error(t.errors[0].message);return t.data.getUsers}catch(o){throw console.error("Error fetching users:",o),new Error("Failed to fetch users")}},updateUser:async(n,o)=>{const e=`
      mutation UpdateUser($id: ID!, $name: String, $email: String, $businessId: String) {
        updateUser(id: $id, name: $name, email: $email, businessId: $businessId) {
          id
          name
          email
          role
          businessId
        }
      }
    `;try{const t=localStorage.getItem("token");if(!t)throw new Error("Authentication required");const a=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:e,variables:{id:n,...o}})})).json();if(a.errors)throw new Error(a.errors[0].message);return a.data.updateUser}catch(t){throw console.error("Error updating user:",t),new Error("Failed to update user")}},deleteUser:async n=>{const o=`
      mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
      }
    `;try{const e=localStorage.getItem("token");if(!e)throw new Error("Authentication required");const r=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:o,variables:{id:n}})})).json();if(r.errors)throw new Error(r.errors[0].message);return r.data.deleteUser}catch(e){throw console.error("Error deleting user:",e),new Error("Failed to delete user")}},getContacts:async()=>{const n=`
      query GetContacts {
        getContacts {
          id
          name
          email
          phone
          address
          latitude
          longitude
          googleMapsUrl
          website
          description
          businessHours
          socialMedia {
            facebook
            instagram
            twitter
            linkedin
          }
          createdAt
          updatedAt
        }
      }
    `;try{const e=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:n})})).json();if(e.errors)throw new Error(e.errors[0].message);return e.data.getContacts}catch(o){throw console.error("Error fetching contacts:",o),new Error("Failed to fetch contacts")}},createContact:async n=>{const o=`
      mutation CreateContact(
        $name: String!
        $email: String!
        $phone: String!
        $address: String!
        $latitude: Float!
        $longitude: Float!
        $googleMapsUrl: String!
        $website: String!
        $description: String!
        $businessHours: String!
        $socialMedia: SocialMediaInput
      ) {
        createContact(
          name: $name
          email: $email
          phone: $phone
          address: $address
          latitude: $latitude
          longitude: $longitude
          googleMapsUrl: $googleMapsUrl
          website: $website
          description: $description
          businessHours: $businessHours
          socialMedia: $socialMedia
        ) {
          id
          name
          email
          phone
          address
          latitude
          longitude
          googleMapsUrl
          website
          description
          businessHours
          socialMedia {
            facebook
            instagram
            twitter
            linkedin
          }
          createdAt
          updatedAt
        }
      }
    `;try{const e=localStorage.getItem("token");if(!e)throw new Error("Authentication required");const r=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:o,variables:n})})).json();if(r.errors)throw new Error(r.errors[0].message);return r.data.createContact}catch(e){throw console.error("Error creating contact:",e),new Error("Failed to create contact")}},updateContact:async(n,o)=>{const e=`
      mutation UpdateContact(
        $id: ID!
        $name: String
        $email: String
        $phone: String
        $address: String
        $latitude: Float
        $longitude: Float
        $googleMapsUrl: String
        $website: String
        $description: String
        $businessHours: String
        $socialMedia: SocialMediaInput
      ) {
        updateContact(
          id: $id
          name: $name
          email: $email
          phone: $phone
          address: $address
          latitude: $latitude
          longitude: $longitude
          googleMapsUrl: $googleMapsUrl
          website: $website
          description: $description
          businessHours: $businessHours
          socialMedia: $socialMedia
        ) {
          id
          name
          email
          phone
          address
          latitude
          longitude
          googleMapsUrl
          website
          description
          businessHours
          socialMedia {
            facebook
            instagram
            twitter
            linkedin
          }
          createdAt
          updatedAt
        }
      }
    `;try{const t=localStorage.getItem("token");if(!t)throw new Error("Authentication required");const a=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:e,variables:{id:n,...o}})})).json();if(a.errors)throw new Error(a.errors[0].message);return a.data.updateContact}catch(t){throw console.error("Error updating contact:",t),new Error("Failed to update contact")}},deleteContact:async n=>{const o=`
      mutation DeleteContact($id: ID!) {
        deleteContact(id: $id)
      }
    `;try{const e=localStorage.getItem("token");if(!e)throw new Error("Authentication required");const r=await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:o,variables:{id:n}})})).json();if(r.errors)throw new Error(r.errors[0].message);return r.data.deleteContact}catch(e){throw console.error("Error deleting contact:",e),new Error("Failed to delete contact")}}};export{l as g};
