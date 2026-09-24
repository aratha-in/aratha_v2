import { getServices, getPortfolio, getBlogs } from '../src/services/dbService';

async function runTests() {
  console.log('🧪 Running Backend Integration Tests...');

  const services = await getServices();
  console.assert(Array.isArray(services) && services.length > 0, 'Services should return array');
  console.log(`  ✓ Services test passed (${services.length} items)`);

  const portfolio = await getPortfolio();
  console.assert(Array.isArray(portfolio) && portfolio.length > 0, 'Portfolio should return array');
  console.log(`  ✓ Portfolio test passed (${portfolio.length} items)`);

  const blogs = await getBlogs();
  console.assert(Array.isArray(blogs) && blogs.length > 0, 'Blogs should return array');
  console.log(`  ✓ Blogs test passed (${blogs.length} items)`);

  console.log('🎉 All Backend Tests Passed Cleanly!');
}

runTests().catch(err => {
  console.error('❌ Test execution failed:', err);
  process.exit(1);
});
