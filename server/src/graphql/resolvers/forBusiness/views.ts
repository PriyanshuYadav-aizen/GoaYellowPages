import Business from "../../../models/Business";

export const incrementPublicView = async (
  _: any,
  { businessId, date }: { businessId: string; date?: string }
) => {
  const d = date || new Date().toISOString().slice(0, 10);
  const update: any = {
    $inc: {
      publicViews: 1,
      [`publicViewsByDate.${d}`]: 1,
    },
  };

  const business = await Business.findByIdAndUpdate(businessId, update, {
    new: true,
  }).lean();

  if (!business) throw new Error("Business not found");

  const result: any = { ...business, id: String((business as any)._id) };
  if (result.publicViewsByDate instanceof Map) {
    result.publicViewsByDate = Object.fromEntries(
      Array.from((result.publicViewsByDate as Map<string, number>).entries())
    );
  }
  return result;
};
