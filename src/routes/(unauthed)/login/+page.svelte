<!-- src/routes/login/+page.svelte -->
<script>
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
  
	let rememberMe = $state(false);
	let isLoading = $state(false);
	let isVisible = $state(false);
  
	onMount(() => {
	  isVisible = true;
	});
  </script>
  
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
	{#if isVisible}
	  <div 
		in:fly="{{ y: 50, duration: 1000 }}"
		class="w-full max-w-md">
		
		<div class="text-center mb-8">
		  <div class="w-20 h-20 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
			</svg>
		  </div>
		  <h2 class="text-3xl font-bold text-green-800">Welcome Back To E-Joroyo</h2>
		  <p class="text-green-600 mt-2">Login to access your plant monitoring dashboard</p>
		</div>
  
		<form 
			use:enhance={() => {
				isLoading = true;
				return async ({ result }) => {
					pb.authStore.loadFromCookie(document.cookie);
					if(result.type === 'error' || result.type === 'failure') {
						isLoading = false;
					}
					await applyAction(result);
				};
			}}
		  	class="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg"
			method="POST"
		  >
		  <!-- Email Input -->
		  <div class="mb-6">
			<label for="email" class="block text-sm font-medium text-green-700 mb-2">
			  Email Address
			</label>
			<input
			  type="email"
			  id="email"
			  name="email"
			  required
			  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
			  placeholder="Enter your email"
			/>
		  </div>
  
		  <!-- Password Input -->
		  <div class="mb-6">
			<label for="password" class="block text-sm font-medium text-green-700 mb-2">
			  Password
			</label>
			<input
			  type="password"
			  id="password"
			  name="password"
			  required
			  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
			  placeholder="Enter your password"
			/>
		  </div>
  
		  <!-- Remember Me & Forgot Password -->
		  <div class="flex items-center justify-between mb-6">
			<label class="flex items-center space-x-2">
			  <input
				type="checkbox"
				bind:checked={rememberMe}
				class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
			  />
			  <span class="text-sm text-green-700">Remember me</span>
			</label>
			<a href="/forgot-password" class="text-sm text-green-600 hover:text-green-800">
			  Forgot Password?
			</a>
		  </div>
  
		  <!-- Submit Button -->
		  <button
			type="submit"
			disabled={isLoading}
			class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
		  >
			{#if isLoading}
			  <span class="inline-flex items-center">
				<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Logging in...
			  </span>
			{:else}
			  Login
			{/if}
		  </button>
		</form>
  
		<!-- Back to Home -->
		<div class="text-center mt-6">
		  <a 
			href="/" 
			class="text-green-600 hover:text-green-800 text-sm"
		  >
			← Back to Home
		  </a>
		</div>
	  </div>
	{/if}
  </div>