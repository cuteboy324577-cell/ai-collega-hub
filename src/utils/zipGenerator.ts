import JSZip from 'jszip';
import { JAVA_PROJECT_FILES } from '../data/javaSourceCode';

export async function generateJavaSpringBootZip(): Promise<Blob> {
  const zip = new JSZip();

  // Root folder
  const root = zip.folder('tamil-nadu-college-events-hub');

  if (!root) {
    throw new Error('Failed to initialize zip archive');
  }

  // Add all Java project files into respective folders
  for (const file of JAVA_PROJECT_FILES) {
    root.file(file.path, file.content);
  }

  // Add standard mvnw wrapper files / gitignore
  root.file('.gitignore', `target/\n!.mvn/wrapper/maven-wrapper.jar\n!**/src/main/**/target/\n.idea/\n*.iml\n.project\n.settings/\n`);

  return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
