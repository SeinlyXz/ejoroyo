<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    let isVisible = $state(false);
    
    onMount(() => {
        isVisible = true;
    });

    const historyBack = () => {
        window.history.back();
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
    {#if isVisible}
        <div 
            in:fly="{{ y: 50, duration: 1000 }}"
            class="text-center max-w-xl mx-auto">
            
            <!-- 404 Icon -->
            <div class="mb-8 relative">
                <div class="w-32 h-32 bg-green-600/20 rounded-full mx-auto flex items-center justify-center">
                    <svg 
                        class="w-20 h-20 text-green-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
                        </path>
                    </svg>
                </div>
                <!-- Decorative Leaves -->
                <div class="absolute -top-4 -right-4 w-12 h-12 text-green-500 transform rotate-45">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 3L3 21l18-9v9L3 3h9L3 21z"></path>
                    </svg>
                </div>
                <div class="absolute -bottom-4 -left-4 w-12 h-12 text-green-500 transform -rotate-45">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 3L3 21l18-9v9L3 3h9L3 21z"></path>
                    </svg>
                </div>
            </div>

            <!-- Text Content -->
            <div class="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
                <h1 class="text-6xl font-bold text-green-800 mb-4">404</h1>
                <h2 class="text-2xl font-semibold text-green-700 mb-4">Page Not Found</h2>
                <p class="text-green-600 mb-8">
                    Oops! It seems this plant has wandered off. Let's get you back to familiar ground.
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onclick={historyBack}
                        class="px-6 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors inline-flex items-center justify-center">
                        <svg 
                            class="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24">
                            <path 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M10 19l-7-7m0 0l7-7m-7 7h18">
                            </path>
                        </svg>
                        Go Back
                    </button>
                    <a 
                        href="/" 
                        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center">
                        <svg 
                            class="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24">
                            <path 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                            </path>
                        </svg>
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    {/if}
</div>