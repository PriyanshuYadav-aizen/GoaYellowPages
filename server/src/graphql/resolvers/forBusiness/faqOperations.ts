import Business from "../../../models/Business";

export const addFAQ = async (_: any, { businessId, question, answer }: any) => {
  try {
    const business = await Business.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }

    business.faq.push({ question, answer });
    await business.save();

    return business;
  } catch (error) {
    throw new Error(`Failed to add FAQ: ${error}`);
  }
};

export const updateFAQ = async (_: any, { businessId, faqIndex, question, answer }: any) => {
  try {
    const business = await Business.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }

    if (faqIndex < 0 || faqIndex >= business.faq.length) {
      throw new Error("FAQ index out of bounds");
    }

    business.faq[faqIndex] = { question, answer };
    await business.save();

    return business;
  } catch (error) {
    throw new Error(`Failed to update FAQ: ${error}`);
  }
};

export const deleteFAQ = async (_: any, { businessId, faqIndex }: any) => {
  try {
    const business = await Business.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }

    if (faqIndex < 0 || faqIndex >= business.faq.length) {
      throw new Error("FAQ index out of bounds");
    }

    business.faq.splice(faqIndex, 1);
    await business.save();

    return business;
  } catch (error) {
    throw new Error(`Failed to delete FAQ: ${error}`);
  }
};
