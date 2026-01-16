import Dashboard from './pages/Dashboard';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/ProductForm';
import Login from './pages/Login';
import SearchPage from './pages/SearchPage';
import Register from './pages/Register';
import AdminLogin from './layouts/AdminLayout';

function App() {
  return (
    <Router >
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login role="user" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Client Routes */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<ProductList isAdmin={false} />} />
            <Route path="detail/:id" element={<ProductDetail isAdmin={false} />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductList isAdmin={true} />} />
            <Route path="products/detail/:id" element={<ProductDetail isAdmin={true} />} />
            <Route path="products/create" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />

          </Route>

          {/* Fallback for old Create/Edit routes if needed, or redirect */}
          {/* For now keeping them accessible but ideally they should move to admin */}
          <Route path="/create" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
