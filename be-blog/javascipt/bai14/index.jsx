const { useState, useEffect } = React;

// --- Data & Utils ---
const ALL_COURSES = [
    { id: 1, title: "React JS Mastery", desc: "Master modern React from scratch. Hooks, Redux, Context API.", price: 49, image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80", badge: "Best Seller", category: "Frontend" },
    { id: 2, title: "Advanced JavaScript", desc: "Deep dive into JS core: Closures, Async/Await & Patterns.", price: 59, image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80", badge: "New", category: "Frontend" },
    { id: 3, title: "UI/UX Fundamentals", desc: "Design beautiful user interfaces that users love using Figma.", price: 39, image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80", badge: null, category: "Design" },
    { id: 4, title: "Node.js Backend", desc: "Build scalable backends with Node, Express & MongoDB.", price: 45, image: "https://images.unsplash.com/photo-1618477247222-ac59e2762111?w=800&q=80", badge: "Trending", category: "Backend" },
    { id: 5, title: "Python Data Science", desc: "Analyze data & build ML models with Python & Pandas.", price: 69, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", badge: null, category: "Data Science" },
    { id: 6, title: "Mobile Flutter dev", desc: "Build native iOS and Android apps with a single codebase.", price: 55, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", badge: "Hot", category: "Mobile" },
    { id: 7, title: "Docker & Kubernetes", desc: "Master containerization and orchestration for scalable apps.", price: 65, image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?w=800&q=80", badge: "Essential", category: "DevOps" },
    { id: 8, title: "AWS Cloud Architect", desc: "Prepare for the AWS Solutions Architect Associate exam.", price: 89, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", badge: "Career", category: "Cloud" },
    { id: 9, title: "Digital Marketing", desc: "SEO, Social Media, and Content Marketing strategies.", price: 29, image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80", badge: null, category: "Business" },
    { id: 10, title: "TypeScript Pro", desc: "Scale your JavaScript applications with TypeScript.", price: 42, image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80", badge: "Recommended", category: "Frontend" },
    { id: 11, title: "Cybersecurity Basics", desc: "Learn ethical hacking and network security fundamentals.", price: 75, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", badge: null, category: "Security" },
    { id: 12, title: "Graphic Design Master", desc: "Photoshop, Illustrator, and design principles.", price: 45, image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&q=80", badge: null, category: "Design" },
    { id: 13, title: "SQL & Databases", desc: "Master SQL queries and database design with PostgreSQL.", price: 35, image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80", badge: null, category: "Backend" },
    { id: 14, title: "Machine Learning", desc: "Build AI models with TensorFlow and PyTorch.", price: 95, image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80", badge: "Advanced", category: "Data Science" },
    { id: 15, title: "Vue.js 3 Complete", desc: "The Composition API and building modern Vue apps.", price: 40, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80", badge: null, category: "Frontend" }
];

// --- Toast System ---
const ToastContainer = ({ toasts }) => (
    <div className="toast-container">
        {toasts.map(toast => (
            <div key={toast.id} className={`toast ${toast.type}`}>
                {toast.type === 'success' ? '✅' : 'ℹ️'} {toast.message}
            </div>
        ))}
    </div>
);

// --- Components ---
const Header = ({ setPage, cartCount, user, logout }) => (
    <header>
        <div className="nav-container">
            <span onClick={() => setPage('home')} className="logo">ProCourses.</span>
            <nav className="nav-links">
                <button className="nav-item" onClick={() => setPage('all-products')}>All Products</button>
                <button className="nav-item" onClick={() => setPage('about')}>About</button>
                <button className="nav-item cart-btn" onClick={() => setPage('cart')}>
                    Cart {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
                </button>
                {user ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600' }}>Hi, {user.name}</span>
                        <button className="nav-item" onClick={logout}>Exit</button>
                    </div>
                ) : (
                    <button onClick={() => setPage('login')} className="btn-primary">Sign In</button>
                )}
            </nav>
        </div>
    </header>
);

const Hero = ({ setPage }) => (
    <section className="hero fade-in">
        <h1>Master Skills for the Future</h1>
        <p>Premium courses taught by industry experts. Join 50,000+ developers building the future today.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setPage('all-products')} className="btn-primary">Explore Courses</button>
            <button className="btn-outline">View Roadmap</button>
        </div>
    </section>
);

const Features = () => (
    <div className="section fade-in" style={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <div className="grid">
            <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚀 Expert Mentors</h3>
                <p style={{ color: 'var(--text-muted)' }}>Learn from the top 1% engineers.</p>
            </div>
            <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💻 Hands-on</h3>
                <p style={{ color: 'var(--text-muted)' }}>Build real projects for your portfolio.</p>
            </div>
            <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏆 Certificate</h3>
                <p style={{ color: 'var(--text-muted)' }}>Earn recognized industry certificates.</p>
            </div>
        </div>
    </div>
);

const CourseCard = ({ course, addToCart }) => (
    <div className="card fade-in">
        <div className="card-image">
            <img src={course.image} alt={course.title} />
            {course.badge && <span className="badge">{course.badge}</span>}
        </div>
        <div className="card-content">
            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{course.category}</div>
            <h3 className="course-title">{course.title}</h3>
            <p className="course-desc">{course.desc}</p>
            <div className="card-footer">
                <span className="price">${course.price}</span>
                <button onClick={() => addToCart(course)} className="add-btn">Add to Cart +</button>
            </div>
        </div>
    </div>
);

const AllProductsPage = ({ addToCart }) => {
    const [category, setCategory] = useState('All');
    const filteredCourses = category === 'All' ? ALL_COURSES : ALL_COURSES.filter(c => c.category === category);
    const categories = ['All', ...new Set(ALL_COURSES.map(c => c.category))];

    return (
        <div className="section fade-in">
            <h2 className="section-title">Discover Courses</h2>
            <div className="filters">
                {categories.map(cat => (
                    <button key={cat} className={`filter-btn ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>{cat}</button>
                ))}
            </div>
            <div className="grid">
                {filteredCourses.map(c => <CourseCard key={c.id} course={c} addToCart={addToCart} />)}
            </div>
        </div>
    );
};

const CartPage = ({ cart, removeFromCart, setPage }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (cart.length === 0) return (
        <div className="section fade-in" style={{ textAlign: 'center', padding: '5rem' }}>
            <h2>Your cart is empty 🛒</h2> <button onClick={() => setPage('all-products')} className="btn-primary" style={{ marginTop: '2rem' }}>Go Shopping</button>
        </div>
    );

    return (
        <div className="section fade-in">
            <h2 className="section-title">Shopping Cart</h2>
            <table className="cart-table">
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div><strong>{item.title}</strong></div>
                                <div style={{ color: '#64748B', fontSize: '0.9rem' }}>{item.category}</div>
                            </td>
                            <td style={{ fontWeight: 'bold' }}>${item.price}</td>
                            <td style={{ textAlign: 'right' }}>
                                <button onClick={() => removeFromCart(index)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Total: ${total}</div>
                <button onClick={() => setPage('checkout')} className="btn-primary">Checkout Now</button>
            </div>
        </div>
    );
};

// Simplified checkout & login for brevity but styled
const CheckoutPage = ({ placeOrder }) => (
    <div className="form-container fade-in">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Secure Checkout</h2>
        <form onSubmit={(e) => { e.preventDefault(); placeOrder(); }}>
            <div className="form-group"><input placeholder="Cardholder Name" required style={{ marginBottom: '1rem' }} /></div>
            <div className="form-group"><input placeholder="Card Number" required style={{ marginBottom: '2rem' }} /></div>
            <button className="btn-primary" style={{ width: '100%' }}>Pay Securely</button>
        </form>
    </div>
);

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    return (
        <div className="form-container fade-in">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Welcome Back</h2>
            <form onSubmit={(e) => { e.preventDefault(); onLogin({ name: email.split('@')[0], email }); }}>
                <div className="form-group"><input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required style={{ marginBottom: '1rem' }} /></div>
                <div className="form-group"><input type="password" placeholder="Password" required style={{ marginBottom: '2rem' }} /></div>
                <button className="btn-primary" style={{ width: '100%' }}>Sign In</button>
            </form>
        </div>
    );
};

const App = () => {
    // Persistent State
    const [page, setPage] = useState('home');
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [toasts, setToasts] = useState([]);

    useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
    useEffect(() => { localStorage.setItem('user', JSON.stringify(user)); }, [user]);

    // Toast Logic
    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };

    // Actions
    const addToCart = (course) => { setCart([...cart, course]); addToast(`Added ${course.title} to cart`); };
    const removeFromCart = (index) => { const newCart = [...cart]; newCart.splice(index, 1); setCart(newCart); addToast('Item removed', 'error'); };
    const placeOrder = () => { setCart([]); setPage('home'); addToast('Order successful! Check email.', 'success'); };
    const login = (u) => { setUser(u); setPage('home'); addToast(`Welcome back, ${u.name}!`); };
    const logout = () => { setUser(null); setCart([]); setPage('home'); addToast('Logged out successfully'); };

    return (
        <>
            <Header setPage={setPage} cartCount={cart.length} user={user} logout={logout} />
            <main style={{ minHeight: '80vh' }}>
                {page === 'home' && <><Hero setPage={setPage} /><Features /><AllProductsPage addToCart={addToCart} /></>}
                {page === 'all-products' && <AllProductsPage addToCart={addToCart} />}
                {page === 'about' && <div className="section fade-in"><h2>About Us</h2><p>We are ProCourses.</p></div>}
                {page === 'cart' && <CartPage cart={cart} removeFromCart={removeFromCart} setPage={setPage} />}
                {page === 'checkout' && <CheckoutPage placeOrder={placeOrder} />}
                {page === 'login' && <LoginPage onLogin={login} />}
            </main>
            <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid #eee' }}>
                <p style={{ color: 'var(--text-muted)' }}>© 2024 ProCourses. Elevating Education.</p>
            </footer>
            <ToastContainer toasts={toasts} />
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
