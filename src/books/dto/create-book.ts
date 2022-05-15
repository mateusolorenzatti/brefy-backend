export interface CreateBookDto {
    title: string;
    description?: string;
    pages: number;
    year: number;
    genre?: string;
}