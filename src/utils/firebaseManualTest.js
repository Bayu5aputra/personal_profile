// Manual Firebase Connection Test
// Run this file to test Firebase connection manually

import { testFirebaseConnection } from './reviewSystem';
import { addReview, getProductReviews } from './reviewSystem';

// Test 1: Connection Test
export const runConnectionTest = async () => {
	console.log("\n========================================");
	console.log("TEST 1: Firebase Connection Test");
	console.log("========================================");
	
	const isConnected = await testFirebaseConnection();
	
	if (isConnected) {
		console.log("✅ TEST 1 PASSED: Firebase is connected");
	} else {
		console.log("❌ TEST 1 FAILED: Firebase connection failed");
	}
	
	return isConnected;
};

// Test 2: Add Review Test
export const runAddReviewTest = async () => {
	console.log("\n========================================");
	console.log("TEST 2: Add Review Test");
	console.log("========================================");
	
	const testReview = {
		name: "Test User",
		rating: 5,
		comment: "This is a test review from Firebase connection test"
	};
	
	const result = await addReview(1, testReview);
	
	if (result.success) {
		console.log("✅ TEST 2 PASSED: Review added successfully");
		console.log("   Source:", result.source);
	} else {
		console.log("❌ TEST 2 FAILED: Could not add review");
	}
	
	return result.success;
};

// Test 3: Get Reviews Test
export const runGetReviewsTest = async () => {
	console.log("\n========================================");
	console.log("TEST 3: Get Reviews Test");
	console.log("========================================");
	
	const reviews = await getProductReviews(1);
	
	console.log(`📊 Retrieved ${reviews.length} reviews`);
	
	if (reviews.length > 0) {
		console.log("✅ TEST 3 PASSED: Reviews retrieved successfully");
		console.log("   Sample review:", {
			name: reviews[0].name,
			rating: reviews[0].rating,
			source: reviews[0].source
		});
	} else {
		console.log("⚠️ TEST 3: No reviews found (this is OK if database is empty)");
	}
	
	return true;
};

// Run All Tests
export const runAllTests = async () => {
	console.log("\n🧪 FIREBASE CONNECTION TEST SUITE");
	console.log("====================================\n");
	
	const test1 = await runConnectionTest();
	const test2 = await runAddReviewTest();
	const test3 = await runGetReviewsTest();
	
	console.log("\n========================================");
	console.log("TEST SUMMARY");
	console.log("========================================");
	console.log(`Connection Test: ${test1 ? '✅ PASSED' : '❌ FAILED'}`);
	console.log(`Add Review Test: ${test2 ? '✅ PASSED' : '❌ FAILED'}`);
	console.log(`Get Reviews Test: ${test3 ? '✅ PASSED' : '⚠️ WARNING'}`);
	console.log("========================================\n");
	
	if (test1 && test2 && test3) {
		console.log("🎉 All tests completed successfully!");
	} else {
		console.log("⚠️ Some tests failed. Check logs above for details.");
	}
};

// Export for console testing
window.firebaseTest = {
	runConnectionTest,
	runAddReviewTest,
	runGetReviewsTest,
	runAllTests
};

console.log("\n💡 To run tests manually, open browser console and type:");
console.log("   firebaseTest.runAllTests()");
console.log("   OR run individual tests:");
console.log("   firebaseTest.runConnectionTest()");
console.log("   firebaseTest.runAddReviewTest()");
console.log("   firebaseTest.runGetReviewsTest()\n");