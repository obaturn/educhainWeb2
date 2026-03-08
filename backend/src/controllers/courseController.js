import Course from '../models/Course.js';

export async function createCourse(req, res) {
  const { title, description, content } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      content,
      creatorId: req.user.id,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Course creation failed', error: err.message });
  }
}

export async function getCourses(req, res) {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
}

export async function getCourse(req, res) {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch course', error: err.message });
  }
}

export async function updateCourse(req, res) {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await course.update(req.body);
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update course', error: err.message });
  }
}

export async function deleteCourse(req, res) {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await course.destroy();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete course', error: err.message });
  }
}
