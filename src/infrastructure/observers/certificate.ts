import { Observer } from "../../domain/events/events"
import { GeneratedCertificate } from "./observer"

export function createCertificate(onCertificateGenerated?: (certificate: GeneratedCertificate) => void): Observer {
  return (event) => {
    if (event.type !== "CourseCompleted") {
      return
    }

    const certificate: GeneratedCertificate = {
      courseId: event.courseId,
      courseTitle: event.courseTitle,
      issuedAt: new Date(),
    }

    if (onCertificateGenerated) {
      onCertificateGenerated(certificate)
      return
    }

    console.log(
      `Certificate generated for course "${certificate.courseTitle}" (${certificate.courseId}) at ${certificate.issuedAt.toISOString()}`,
    )
  }
}
