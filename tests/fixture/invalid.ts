class Sample {
	test(word = "world") {
		return "Hello," + word;
	}

	// duplicated!
	test(word = "world") {
		return "Hello," + word;
	}
}
