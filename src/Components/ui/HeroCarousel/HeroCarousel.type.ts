export interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
}

export interface HeroCarouselProps {
  banners: Banner[];
}
