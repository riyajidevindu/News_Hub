const Footer = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="text-center md:text-left md:px-[120px]" >
          <h2 className="text-xl font-bold">Explore</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-500">Featured Blogs</a></li>
            <li><a href="#" className="hover:text-gray-500">Most viewed</a></li>
            <li><a href="#" className="hover:text-gray-500">Readers Choice</a></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Resources</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-500">Forum</a></li>
            <li><a href="#" className="hover:text-gray-500">Support</a></li>
            <li><a href="#" className="hover:text-gray-500">Recent Posts</a></li>
          </ul>
        </div>

        <div className="text-center md:text-left md:px-[120px]" >
          <h2 className="text-xl font-bold">Legal</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-500">About Us</a></li>
            <li><a href="#" className="hover:text-gray-500">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gray-500">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <p className="text-center text-sm pt-6">All rights reserved @NewsHub 2023</p>
    </div>
  );
}

export default Footer;
