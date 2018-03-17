package hr.fer.ppij.converter

import java.sql.Timestamp
import javax.persistence.AttributeConverter
import javax.persistence.Converter
import java.time.LocalDateTime

@Converter
class LocalDateTimeAttributeConverter : AttributeConverter<LocalDateTime, Timestamp> {

    override fun convertToDatabaseColumn(locDateTime: LocalDateTime?): Timestamp? {
        return if (locDateTime == null) null else Timestamp.valueOf(locDateTime)
    }

    override fun convertToEntityAttribute(sqlTimestamp: Timestamp?): LocalDateTime? {
        return if (sqlTimestamp == null) null else sqlTimestamp.toLocalDateTime()
    }
}