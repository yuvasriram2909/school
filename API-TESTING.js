/**
 * YUVA'S SCHOOL - API Testing Examples
 * Use these examples to test the backend API
 */

// ═══════════════════════════════════════════════════════════
// TEST 1: Health Check
// ═══════════════════════════════════════════════════════════

console.log('TEST 1: Health Check');
fetch('http://localhost:5000/api/health')
  .then(res => res.json())
  .then(data => console.log(data));

// ═══════════════════════════════════════════════════════════
// TEST 2: Submit Contact Form
// ═══════════════════════════════════════════════════════════

console.log('TEST 2: Contact Form');
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91-9876543210',
    subject: 'Inquiry about Class VI Admission',
    message: 'I would like to know more about the admission process for Class VI. Can you provide information about fees and required documents?'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// ═══════════════════════════════════════════════════════════
// TEST 3: Submit Admission Application
// ═══════════════════════════════════════════════════════════

console.log('TEST 3: Admission Application');
fetch('http://localhost:5000/api/admissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    studentName: 'Arjun Sharma',
    parentName: 'Vikram Sharma',
    email: 'vikram.sharma@example.com',
    phone: '+91-9988776655',
    classApplying: 'VI',
    message: 'Our son is very interested in sports, particularly cricket and swimming. We are looking for a school with good academic curriculum and sports facilities.'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// ═══════════════════════════════════════════════════════════
// TEST 4: Get Available Classes
// ═══════════════════════════════════════════════════════════

console.log('TEST 4: Available Classes');
fetch('http://localhost:5000/api/admissions/classes')
  .then(res => res.json())
  .then(data => console.log(data));

// ═══════════════════════════════════════════════════════════
// TEST 5: Validation Test (Invalid Email)
// ═══════════════════════════════════════════════════════════

console.log('TEST 5: Validation Test');
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'invalid-email', // Invalid
    phone: '+91-9876543210',
    subject: 'Test',
    message: 'Test message'
  })
})
  .then(res => res.json())
  .then(data => console.log(data)); // Should show validation error

// ═══════════════════════════════════════════════════════════
// CURL Examples (for terminal)
// ═══════════════════════════════════════════════════════════

/*

// Health Check
curl http://localhost:5000/api/health

// Contact Form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "subject": "Query",
    "message": "I have a question"
  }'

// Admission Application
curl -X POST http://localhost:5000/api/admissions \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test Student",
    "parentName": "Test Parent",
    "email": "test@example.com",
    "phone": "+91-9876543210",
    "classApplying": "VI"
  }'

// Get Classes
curl http://localhost:5000/api/admissions/classes

*/
