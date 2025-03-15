export function MainLayout({ children }) {
  return (
	<div className="bg-gray-100">
	  <Header />
	  <main>{children}</main>
	  <Footer />
	</div>
  );
}