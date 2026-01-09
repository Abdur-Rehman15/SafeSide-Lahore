import { Outlet, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Container,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import ShieldIcon from '@mui/icons-material/Shield'; // Assuming same as landing page
import { useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      className="dashboard"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 50%, #ede7f6 100%)',
      }}
    >
      {/* ===== NAVBAR ===== */}
      <AppBar
        position="static"
        sx={{
    background: 'linear-gradient(135deg, #6c3483 0%, #ff9f43 100%)',
    boxShadow: '0 6px 24px rgba(142,68,173,0.35)', // slightly smaller, still premium
    py: { xs: 1.5, md: 2 }, // reduced vertical padding
  }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, fontSize: { xs: '1.2rem', md: '1.5rem' }, color: 'white' }}
          >
            SafeSide Pakistan
          </Typography>

          {/* USER MENU */}
          <IconButton onClick={handleMenuOpen} sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.5)',
              }}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>
            <Typography sx={{ ml: 1, color: 'white', fontWeight: 600 }}>
              {user?.firstName}
            </Typography>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': {
                background: 'linear-gradient(135deg, #f8f1fa 0%, #fff8f5 100%)',
                borderRadius: '15px',
                mt: 1,
              },
            }}
          >
            <MenuItem component={Link} to="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* ===== HERO ===== */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(108,52,131,0.1), transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.05 },
              '50%': { opacity: 0.15 },
            },
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mb: 4 }}>
          <Typography
  variant="h2"
  sx={{
    fontWeight: 900,
    mb: 3,
    fontSize: { xs: '2.5rem', md: '4rem' },
    background: 'linear-gradient(45deg, #6c3483, #9c27b0, #ba68c8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 4px 16px rgba(108,52,131,0.3)',
    animation: 'float 3s ease-in-out infinite',
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  }}
>
  Welcome back, {user?.firstName}{' '}
  <span style={{ color: 'inherit', WebkitTextFillColor: 'initial' }}>🛡️</span>
</Typography>


          <Typography
            sx={{
              color: '#6c3483',
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              lineHeight: 1.8,
              maxWidth: 700,
              mx: 'auto',
              fontWeight: 500,
              textShadow: '0 1px 4px rgba(108,52,131,0.1)',
            }}
          >
            Monitor safety, explore secure routes, and report incidents in real-time. Your personal safety control center is ready with love and care. 
          </Typography>
        </Container>

        {/* CARDS */}
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
          <Outlet />
        </Container>
      </Box>

      {/* ===== FOOTER ===== */}
      <Box
        component="footer"
        className="premium-footer"
        sx={{
          mt: 'auto',
          background: 'linear-gradient(135deg, #4a235a 0%, #6c3483 100%)',
          color: 'white',
          borderTopLeftRadius: '80px',
          borderTopRightRadius: '80px',
          position: 'relative',
          px: '5%',
          py: '3rem',
        }}
      >
        <Box
          className="footer-content"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 3,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* BRAND */}
          <Box className="footer-brand" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box className="app-logo">
              <ShieldIcon sx={{ width: 60, height: 60, color: 'white' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                textShadow: '0 2px 5px rgba(0,0,0,0.3)',
              }}
            >
              SafeSide <span style={{ background: 'linear-gradient(45deg, #ff9f43, #ffa726)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Pakistan
              </span>
            </Typography>
          </Box>

          {/* CONTACTS */}
          <Box className="footer-contacts" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <a
              href="mailto:safesidenavigation@gmail.com"
              className="contact-link"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none' }}
            >
              📧 safesidenavigation@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/abdurrehman887/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none' }}
            >
              🔗 /abdurrehman887
            </a>
          </Box>
        </Box>

        <Typography sx={{ mt: 8, textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}> {/* Increased mt for more space below */}
          © {new Date().getFullYear()} SafeSide Pakistan. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}