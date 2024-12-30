<template>
  <div class="about-us-container">
    <div class="heading-container">
      <div class="line"></div>
      <h1 class="animated-title">About Us</h1>
      <div class="line"></div>
    </div>
    <p class="fade-in">
      Welcome to <strong>Dil Ka Rishta</strong>, a platform dedicated to bringing people together through meaningful connections. Our mission is to help individuals find their perfect match, fostering relationships based on love, respect, and understanding.
    </p>
    <p class="fade-in delay-1">
      At Dil Ka Rishta, we believe in the power of love and companionship. Our values are rooted in honesty, integrity, and commitment to our users. We strive to provide a safe and supportive environment for everyone looking for a partner.
    </p>
    <div class="heading-container">
      <div class="line"></div>
      <h2 class="slide-in">Our Vision</h2>
      <div class="line"></div>
    </div>
    <p class="fade-in delay-2">
      To create a world where everyone can find love and companionship, and where relationships are built on mutual respect and understanding.
    </p>
    <div class="heading-container">
      <div class="line"></div>
      <h2 class="slide-in delay-3">Our Team</h2>
      <div class="line"></div>
    </div>
    <p class="fade-in delay-4">
      Our dedicated team of professionals works tirelessly to ensure that our platform meets the needs of our users. We are committed to improving our services and providing an excellent user experience.
    </p>
    <div class="heading-container">
      <div class="line"></div>
      <h2 class="slide-in delay-5">Join Us</h2>
      <div class="line"></div>
    </div>
    <p class="fade-in delay-6">
      Become a part of our growing community today and discover the beauty of meaningful connections. Together, we can help you find your soulmate.
    </p>
    <div class="cta-container fade-in delay-7" v-if="!isLoggedIn">
      <a href="/register" class="cta-button bounce">Join Us Now</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('user'); // Example using localStorage
    },
  },
};
</script>

<style scoped>
.about-us-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  animation: fade-in 1s ease-out;
}

.heading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 20px;
}

.line {
  height: 2px;
  background-color: #e91e63;
  flex-grow: 1;
  margin: 0 10px;
  animation: grow-line 0.8s ease-out;
}

.animated-title {
  font-size: 2.5rem;
  color: #e91e63;
  animation: glow 1.5s infinite alternate, zoom-in 1s ease-out;
  position: relative;
  text-transform: uppercase;
}

h2 {
  font-size: 1.8rem;
  color: #e91e63;
  animation: slide-in 0.8s ease-out;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
  animation: fade-in 1s ease-out;
}

.cta-button {
  background-color: #e91e63;
  color: white;
  padding: 12px 25px;
  font-size: 1.2rem;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  animation: bounce 1.5s infinite;
}

.cta-button:hover {
  background-color: #c2185b;
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes grow-line {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes zoom-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes glow {
  0% {
    text-shadow: 0 0 5px #e91e63, 0 0 10px #ff4081, 0 0 20px #ff79b0;
  }
  100% {
    text-shadow: 0 0 10px #ff4081, 0 0 20px #ff79b0, 0 0 30px #ffe4ec;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Delays for animations */
.fade-in {
  animation: fade-in 1s ease-out forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

.delay-3 {
  animation-delay: 0.6s;
}

.delay-4 {
  animation-delay: 0.8s;
}

.delay-5 {
  animation-delay: 1s;
}

.delay-6 {
  animation-delay: 1.2s;
}

.delay-7 {
  animation-delay: 1.4s;
}
</style>
