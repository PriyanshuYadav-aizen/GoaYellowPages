export declare const getBusinesses: (_: any, { page, limit }: {
    page?: number;
    limit?: number;
}) => Promise<{
    businesses: any[];
    totalPages: number;
    currentPage: number;
    totalBusinesses: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}>;
export declare const getBusiness: (_: any, { id }: {
    id: string;
}) => Promise<any>;
