"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
exports.Business = {
    averageRating: (parent) => {
        if (!parent.ratings || parent.ratings.length === 0) {
            return null;
        }
        const totalRating = parent.ratings.reduce((sum, rating) => sum + rating.rating, 0);
        return parseFloat((totalRating / parent.ratings.length).toFixed(1));
    },
    totalRatings: (parent) => {
        return parent.ratings ? parent.ratings.length : 0;
    },
};
//# sourceMappingURL=businessTypeResolvers.js.map