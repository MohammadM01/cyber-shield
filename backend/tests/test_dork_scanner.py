import unittest
from core.dork_scanner import scan_dorks

class TestDorkScanner(unittest.TestCase):
    def test_scan_dorks(self):
        # Test the scan_dorks function with a sample target
        target = "example.com"
        result = scan_dorks(target)
        
        # Since scan_dorks is mocked, we expect a list with a specific format
        self.assertIsInstance(result, list)
        self.assertGreater(len(result), 0)
        self.assertIn(f"Potential exposure found for {target}", result)

if __name__ == "__main__":
    unittest.main()