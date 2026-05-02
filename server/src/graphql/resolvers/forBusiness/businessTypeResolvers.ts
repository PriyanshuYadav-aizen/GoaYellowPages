// Computed field resolvers for Business type
export const Business = {
  averageRating: (parent: any) => {
    if (!parent.ratings || parent.ratings.length === 0) {
      return null;
    }
    const totalRating = parent.ratings.reduce(
      (sum: number, rating: any) => sum + rating.rating,
      0
    );
    return parseFloat((totalRating / parent.ratings.length).toFixed(1));
  },
  totalRatings: (parent: any) => {
    return parent.ratings ? parent.ratings.length : 0;
  },
};
