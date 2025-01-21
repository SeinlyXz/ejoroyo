<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    
    let stats = $state({
      healthyPlants: 245,
      needAttention: 12,
      waterLevel: 85,
      humidity: 75
    });
  
    let chartData = $state({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [85, 88, 92, 89, 91, 93]
    });
  
    let isVisible = $state(false);
    
    onMount(() => {
      isVisible = true;
    });
  </script>
  
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
    <!-- Hero Section -->
    <header class="container mx-auto px-4 py-16">
      {#if isVisible}
        <div in:fly="{{ y: 50, duration: 1000 }}" class="text-center">
          <h1 class="text-5xl font-bold text-green-800 mb-4">
            E-Joroyo Plant Health Monitor
          </h1>
          <p class="text-xl text-green-700 max-w-2xl mx-auto">
            Monitor and maintain your plants' health with advanced IoT technology and real-time analytics
          </p>
        </div>
      {/if}
    </header>
  
    <!-- Stats Grid -->
    <section class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#if isVisible}
          <div 
            in:fly="{{ y: 50, duration: 1000, delay: 200 }}"
            class="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <h3 class="text-green-600 font-semibold mb-2">Healthy Plants</h3>
            <p class="text-4xl font-bold text-green-800">{stats.healthyPlants}</p>
          </div>
  
          <div 
            in:fly="{{ y: 50, duration: 1000, delay: 400 }}"
            class="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <h3 class="text-yellow-600 font-semibold mb-2">Need Attention</h3>
            <p class="text-4xl font-bold text-yellow-800">{stats.needAttention}</p>
          </div>
  
          <div 
            in:fly="{{ y: 50, duration: 1000, delay: 600 }}"
            class="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <h3 class="text-blue-600 font-semibold mb-2">Water Level</h3>
            <p class="text-4xl font-bold text-blue-800">{stats.waterLevel}%</p>
          </div>
  
          <div 
            in:fly="{{ y: 50, duration: 1000, delay: 800 }}"
            class="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <h3 class="text-purple-600 font-semibold mb-2">Humidity</h3>  
            <p class="text-4xl font-bold text-purple-800">{stats.humidity}%</p>
          </div>
        {/if}
      </div>
    </section>
  
    <!-- Features Section -->
    <section class="container mx-auto px-4 py-16">
      {#if isVisible}
        <div 
          in:fade="{{ duration: 1000, delay: 1000 }}"
          class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-green-800 mb-2">Real-time Monitoring</h3>
            <p class="text-green-700">Get instant updates about your plants' health status and environmental conditions.</p>
          </div>
  
          <div class="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-green-800 mb-2">Smart Alerts</h3>
            <p class="text-green-700">Receive notifications when your plants need water, nutrients, or attention.</p>
          </div>
  
          <div class="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-green-800 mb-2">Analytics Dashboard</h3>
            <p class="text-green-700">Track growth patterns and optimize plant care with detailed analytics.</p>
          </div>
        </div>
      {/if}
    </section>
  
    <!-- CTA Section -->
    <section class="container mx-auto px-4 py-16">
      {#if isVisible}
        <div 
          in:fade="{{ duration: 1000, delay: 1200 }}"
          class="bg-green-600 rounded-2xl p-12 text-center text-white">
          <h2 class="text-3xl font-bold mb-4">Start Monitoring Your Plants Today</h2>
          <p class="mb-8 max-w-2xl mx-auto">Join thousands of plant enthusiasts who are already using our platform to maintain healthier plants.</p>
          <button class="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
            Get Started
          </button>
        </div>
      {/if}
    </section>
  </div>
  
  <style>
    :global(body) {
      @apply bg-green-50;
    }
  </style>