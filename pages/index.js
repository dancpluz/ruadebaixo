import Header from '../components/Header';
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import LandingBanner from '../components/LandingBanner';
import Strip from '../components/Strip';
import LandingProducts from '../components/LandingProducts';

export default function HomePage() {
  return (
    <div>
      <LandingBanner />
      <Strip/>
      <LandingProducts />
    </div>
  )
}
