export interface Product {
    id: string;

    title: string;

    image: string;

    price: number;

    brand: string;

    category: string;

    affiliateLinks: {
        amazon?: string;

        flipkart?: string;

        meesho?: string;

        myntra?: string;
    };
}