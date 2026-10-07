package com.collegeevents.repository;

import com.collegeevents.model.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {

    Optional<College> findByCode(String code);

    List<College> findByDistrictIgnoreCase(String district);

    List<College> findByIsVerifiedTrue();

    boolean existsByCode(String code);

    boolean existsByEmail(String email);
}