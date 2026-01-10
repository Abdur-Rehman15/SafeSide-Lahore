import { Card, CardContent, Typography, Button, Box, styled } from '@mui/material';

const SafetyCard = styled(Card)(({ theme }) => ({
  width: { xs: 320, md: 380 }, 
  height: { xs: 380, md: 420 }, 
  margin: '16px auto', 
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '24px', 
  overflow: 'hidden',
  position: 'relative',
  border: '2px solid rgba(108,52,131,0.15)', 
  boxShadow: '0 8px 32px rgba(108,52,131,0.12)', 
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f9f7ff 100%)', 
  '&:hover': {
    transform: 'translateY(-12px) scale(1.03)', 
    boxShadow: '0 20px 48px rgba(108,52,131,0.25)',
    '&::before': {
      opacity: 0.3, 
      height: 8, 
    },
    '&::after': {
      opacity: 0.15, 
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    background: 'linear-gradient(90deg, #6c3483 0%, #ba68c8 100%)', 
    opacity: 0.2,
    transition: 'opacity 0.4s ease, height 0.4s ease'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(186,104,200,0.08) 0%, transparent 70%)', // Soft purple radial glow
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  }
}));

const CardIconWrapper = styled(Box)(({ theme }) => ({
  width: 84, 
  height: 84, 
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(108,52,131,0.2) 0%, rgba(186,104,200,0.15) 100%)', // Purple gradient
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px', 
  color: '#6c3483', 
  fontSize: '3rem',
  boxShadow: '0 6px 20px rgba(108,52,131,0.25)', 
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.15) rotate(5deg)', 
    boxShadow: '0 8px 28px rgba(108,52,131,0.35)',
  },
  '& svg': {
    fontSize: '3rem'
  }
}));

const SafetyButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6c3483 0%, #ba68c8 100%)', 
  color: 'white',
  borderRadius: '20px', 
  padding: '14px 32px', 
  fontWeight: 700, 
  fontSize: '1.1rem',
  textTransform: 'none',
  boxShadow: '0 6px 20px rgba(108,52,131,0.3)', 
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a2d7a 0%, #a866b8 100%)', 
    boxShadow: '0 10px 28px rgba(108,52,131,0.4)', 
    transform: 'translateY(-3px) scale(1.05)', 
  },
  '&:active': {
    transform: 'translateY(0) scale(1)', 
  }
}));

export default function DashboardCard({ title, description, icon, onClick }) {
  return (
    <SafetyCard>
      <CardContent sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 4, // Increased padding
        textAlign: 'center'
      }}>
        <CardIconWrapper>
          {icon}
        </CardIconWrapper>
        
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{
            textAlign: 'center',
            fontWeight: 800, 
            color: '#6c3483', 
            mb: 2, 
            fontSize: '1.5rem', 
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{
            color: '#7b5a8a', 
            mb: 4,
            fontSize: '1rem', 
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flexGrow: 1
          }}
        >
          {description}
        </Typography>
        
        <Box sx={{ 
          mt: 'auto',
          px: 1,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <SafetyButton 
            fullWidth 
            onClick={onClick}
            size="medium"
          >
            Next ✨
          </SafetyButton>
        </Box>
      </CardContent>
    </SafetyCard>
  );
}