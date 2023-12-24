DELIMITER //

CREATE EVENT DeleteRefreshTokenEvent
ON SCHEDULE EVERY 7 DAY
STARTS STR_TO_DATE(DATE_FORMAT(NOW(), '%Y-%m-%d 01:00:00'), '%Y-%m-%d %H:%i:%s')
DO
BEGIN
    DECLARE ParentTokenValue VARCHAR(36);
    DECLARE RowCountValue INT;
    
    CREATE TEMPORARY TABLE TempTokens
    (
        ParentToken VARCHAR(36)
    );
    
    INSERT INTO TempTokens(ParentToken)
    SELECT Token FROM RefreshTokens
    WHERE IsExpiredAt < NOW() AND ParentToken IS NULL;
    
    SELECT COUNT(*) INTO RowCountValue FROM TempTokens;
	
    SELECT ParentToken INTO ParentTokenValue FROM TempTokens LIMIT 1;
   
    WHILE RowCountValue > 0 DO
        DELETE FROM RefreshTokens WHERE ParentToken = ParentTokenValue;
        DELETE FROM RefreshTokens WHERE Token = ParentTokenValue;
        DELETE FROM TempTokens WHERE ParentToken = ParentTokenValue;
        SET RowCountValue = RowCountValue - 1;
    END WHILE;
    
    DROP TEMPORARY TABLE IF EXISTS TempTokens;
END //

DELIMITER ;
